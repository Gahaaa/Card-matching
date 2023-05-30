# CARD MATCHING
## v4(기타 기능 추가)

### selectedElement2
```js
// 옵션2 카드 이미지
const selectedElement2 = document.getElementById("card_option2");
let optionVal2 = selectedElement2.options[selectedElement2.selectedIndex].value;

selectedElement2.addEventListener('change', function() {
  optionVal2 = selectedElement2.options[selectedElement2.selectedIndex].value;
});

function setGame() {
    .
    .
    .

    if (optionVal == 0) {
    alert('카드 장수를 선택하시오');
    mainBtn.preventDefault();

  }else if(optionVal2 == 0){
    alert('카드 이미지를 선택하시오');
    mainBtn.preventDefault();

  }else if(optionVal2 == 2){
    ulElement.classList.add('mario')

  }

  .
  .
  .
}

```
옵션1(카드 장수 선택)과 같이 value값 저장해 
setGame()에서 설정 가능하도록

<br>

---

<br>

### removeLife()
```js
let opportunity =0;

function cardMatch(cardElement) {
    .
    .
    .
    else {
       // 일치하지 않는 카드 처리
      opportunity+=1;
      removeLife();
    }
}

// 목숨 제거
function removeLife(){
  if(opportunity == lifeIndex){
    setTimeout(function(){
      document.querySelector('.card_section').style.display = 'none';
      document.querySelector('.fail_section').style.display = 'block';
      return false;

    }, 800)
  }

  const lifeEl = document.querySelectorAll('.card_section .top_menu .life li');
  setTimeout(function(){
    lifeEl.item(opportunity-1).classList.add('off')
    
  }, 300)
};
```
**생명 설정**

opportunity변수 카드 일치하지 않을 때마다 +1

opportunity와 lifeEl(목숨개수) 일치하면 게임오버

<br>

---

<br>


### 힌트 클릭 이벤트
```js
let hintCount= 2;
const hintBtn= document.querySelector('.hint_section .btn_hint');
const hintNum = document.querySelector('.top_menu .hint_section p strong');

// 힌트 클릭이벤트
hintBtn.addEventListener('click', function(){
  const cardWrap = document.querySelectorAll('.card_section > ul > li .card_wrap');
  
  if(hintCount <= 0){
    hintBtn.classList.add('off');
    hintNum.innerText='0';
    return false;
  }

  // 카드 뒤집는 이벤트
  cardWrap.forEach(function(item) {
    item.classList.add('on');
  });
  animationStop = true;
  setTimeout(function() {
    cardWrap.forEach(function(item) {
      item.classList.remove('on');
    });
    animationStop = false;
  }, 2500);
  hintCount-=1;

  hintNum.innerText=`${hintCount}`
});
```
hintCount 변수에서 힌트횟수 설정

hintCount 0 이하시 힌트 비활성화

<br>

---

<br>

### 맞춰진 카드 클릭 오류

이미 맞춘 카드 클릭시에도 이벤트 실행

(removeLife 실행으로 목숨을 잃음.....)

-> 하단 코드 추가

```js
function cardMatch(cardElement) {
  const liClass = cardElement.closest('li').className;

  // 이미 맞은 카드 cardMatch 실행 안 함
  if(liClass == 'off'){
    return false;
  }

  elArr.push(liClass);
  animationStop = true;

  if (elArr.length % 2 === 0) {
    if (elArr[elArr.length - 1] === elArr[elArr.length - 2]) {

      // 일치하는 카드 처리
      setTimeout(function() {
        document.querySelectorAll(`.${liClass}`).forEach(function(item) {
            //add 대신 replace로 클래스 교체
          item.classList.replace(liClass,'off');
        });
       
    }
  }

  
}

```
cardMatch(카드 서로 맞는지 비교  함수)상단에 if문 추가로 

class off(카드 맞춤)시 return false!

<br>

---

<br>
<br>

## v5 목표
### 리액트로 작업?
