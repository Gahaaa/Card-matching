let elArr = [];
let animationStop= false;
const cardWrap = $('.card_section > ul > li .card_wrap');

$('.main .button').on('click', function(){
    $('.main').hide();
    $('.card_section').show();
    $('.card_section ul li .card_wrap').stop().addClass('on');
    animationStop=true;
    setTimeout(function(){
        $('.card_section ul li .card_wrap').stop().removeClass('on');
        animationStop=false;
    },2000)

});

$('.card_section > ul > li .card_wrap').on('click', cardOpen)

function cardOpen(el){
    if(!animationStop){
        $(this).addClass('on')
        cardMatch(el)
    }
    console.log(animationStop)
};

function cardMatch(el){
    const liClass = el.target.closest('li').className;
    elArr.push(liClass);
    animationStop=true;
    
    if(elArr.length%2 == 0){
        if(elArr[elArr.length-1] == elArr[elArr.length-2]){
            setTimeout(function(){
                $(`.${liClass}`).stop().addClass('off');
                animationStop=false;
            },800)
            setTimeout(clearGame, 1000);

        }else{
            setTimeout(removeOn,800);
        }
    }else{
        setTimeout(function(){
            animationStop=false;
        }, 200)
    }
};

function removeOn(){
    cardWrap.stop().removeClass('on')
    animationStop=false;
};

function clearGame(){
    if($(".card_section ul li.off").length == 12) {
        $('.card_section').hide();
        $('.result').show();
    }
};

function reload(){
    window.location.reload()
}
