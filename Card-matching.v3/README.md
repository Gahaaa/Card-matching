# CARD MATCHING
## v3(카드 장수 선택 가능)

### optionVal
```js
const selectedElement = document.getElementById("card_option");
let optionVal = selectedElement.options[selectedElement.selectedIndex].value;

selectedElement.addEventListener('change', function() {
  optionVal = selectedElement.options[selectedElement.selectedIndex].value;
});
```
``` html
<select id="card_option">
    <option selected disabled value="0">카드 장수 선택</option>
    <option value="6">12장</option>
    <option value="7">14장</option>
    <option value="8">16장</option>
    <option value="9">18장</option>
</select>
```
옵션값 가져와 optionVal 저장

<br>
<br>

### setGame()
```js
const cardNumber = optionVal;

for (let i = 0; i < cardNumber * 2; i++) {
    // 카드 엘리먼트 생성 및 추가
    const liElement = document.createElement('li');
    liElement.className = `card0${classArr[i]}`;

    const cardWrapElement = document.createElement('div');
    cardWrapElement.className = 'card_wrap';

    const frontElement = document.createElement('div');
    frontElement.className = 'front';

    const backElement = document.createElement('div');
    backElement.className = 'back';

    cardWrapElement.appendChild(frontElement);
    cardWrapElement.appendChild(backElement);

    liElement.appendChild(cardWrapElement);
    ulElement.appendChild(liElement);
  }

```
기존 html로 작성했던 부분 js로 엘리먼트 생성

optionVal 값에 따라 cardNumber(카드 장수) 달라짐

<br>

---

<br>

## v4 목표
### 1. 리액트 사용
리액트로 구현해보기~~.~