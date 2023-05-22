# CARD MATCHING
## v1(jQuery)

### cardMatch()
```js
let elArr = [];
let animationStop= false;
const cardWrap = $('.card_section > ul > li .card_wrap');

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
```
배열에 클래스 이름을 넣어 짝수가 될 때 서로 같은지 확인
- 클래스 같음: opacity:0 클래스 추가
- 클래스 다름: 카드 다시 뒤집음

<br>

### clearGame()
```js
function clearGame(){
    if($(".card_section ul li.off").length == 12) {
        $('.card_section').hide();
        $('.result').show();
    }
};
```
cardMatch()에서 카드가 같을 시 off 추가.

해당 class가 카드의 개수만큼 있을 시 게임 종료

<br>

### animationStop
```js
let animationStop= false;

function cardOpen(){
    if(!animationStop){
        this.classList.add('on');
        cardMatch(event);
    }
}
```
애니메이션 실행 동안
다른 애니메이션 실행 막기위해 추가

<br>

---

<br>

## v2 목표
### 1. 바닐라JS 사용
제이쿼리 사용 xxx
### 2. 카드 이미지 랜덤
현재 고정되어 있는 카드 이미지를 랜덤으로 노출시킬 수 있도록 수정