# CARD MATCHING
## v2(javascript)
### 1. 바닐라JS 사용
### 2. 카드 이미지 랜덤

---

### cardNumber
```js
// 카드개수
const cardNumber = 6;
```
**cardNumber**
짝 맞춰야 되는 개수
추후 카드 개수 변경시 숫자 수정필요

<br>
<br>


### classArr
```js
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
```
**randomIndexArray**
짝 맞춰야되는 개수*2(카드 개수)를 중복되지 않는 배열 

<br>
<br>

**classArr**
7이상인 값 -6해줌
(class가 같은 카드끼리 짝 맞추는 구조이기 때문)

<br>
<br>

### 랜덤 클래스 추가
```js
// 랜덤 클래스 추가
const liClass = document.querySelectorAll('.card_section > ul > li');

for(i=0; i<cardNumber*2; i++){
    liClass[i].classList.add(`card0${classArr[i]}`);
}
```
for문 이용하여 classArr 이용한 클래스 추가

<br>
<br>


## v3 목표
### 1. 게임 시작 전 난이도 설정 가능
ex) 
카드 장 수 선택하여 게임 진행 가능하도록!