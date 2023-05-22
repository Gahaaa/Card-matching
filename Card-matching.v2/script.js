// 카드개수
const cardNumber = 9;

// 카드 랜덤
let randomIndexArray = []
for (i=0; i<cardNumber*2; i++) {
  randomNum = Math.floor(Math.random() * (cardNumber*2))+1;
  if (randomIndexArray.indexOf(randomNum) === -1) {
    randomIndexArray.push(randomNum)
  } else {
    i--
  }
  
}

let classArr = [];

for (i=0; i<cardNumber*2; i++) {

    if (randomIndexArray[i]> cardNumber) {
        classArr.push(randomIndexArray[i]-cardNumber)
    } else {
        classArr.push(randomIndexArray[i])
    }
    
}

// 랜덤 클래스 추가
const liClass = document.querySelectorAll('.card_section > ul > li');

for(i=0; i<cardNumber*2; i++){
    liClass[i].classList.add(`card0${classArr[i]}`);
}


let elArr = [];
let animationStop= false;
const cardWrap = document.querySelectorAll('.card_section > ul > li .card_wrap');

document.querySelector('.main .button').addEventListener('click', function(){
    document.querySelector('.main').style.display = 'none';
    document.querySelector('.card_section').style.display = 'block';
    cardWrap.forEach(function(item){
        item.classList.add('on');
    });
    animationStop=true;
    setTimeout(function(){
        cardWrap.forEach(function(item){
            item.classList.remove('on');
        });
        animationStop=false;
    },2000)

});

cardWrap.forEach(function(item){
    item.addEventListener('click', cardOpen);
});

function cardOpen(){
    if(!animationStop){
        this.classList.add('on');
        cardMatch(event);
    }
    console.log(animationStop)
}

function cardMatch(event){
    const liClass = event.target.closest('li').className;
    elArr.push(liClass);
    animationStop=true;
    
    if(elArr.length%2 == 0){
        if(elArr[elArr.length-1] == elArr[elArr.length-2]){
            setTimeout(function(){
                document.querySelectorAll(`.${liClass}`).forEach(function(item){
                    item.classList.add('off');
                });
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
    cardWrap.forEach(function(item){
        item.classList.remove('on');
    });
    animationStop=false;
};

function clearGame(){
    if(document.querySelectorAll('.card_section ul li.off').length == cardNumber*2) {
        document.querySelector('.card_section').style.display = 'none';
        document.querySelector('.result').style.display = 'block';
    }
};

function reload(){
    window.location.reload()
}