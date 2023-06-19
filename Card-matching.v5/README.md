# CARD MATCHING
## v5(기타 기능 추가)

### 타이머
```js
// 타이머
let timerId;
let time = 0;
const stopwatch = document.getElementById("stopwatch");
let  hour, min, sec;
let timerTxt='00:00:00'


function printTime() {
    time++;
    stopwatch.innerText = getTimeFormatString();
}

//시계 시작 - 재귀호출로 반복실행
function startClock() {
    printTime();
    stopClock();
    timerId = setTimeout(startClock, 1000);
}

//시계 중지
function stopClock() {
    if (timerId != null) {
        clearTimeout(timerId);
    }
}

// 시계 초기화
function resetClock() {
    stopClock()
    stopwatch.innerText = "00:00:00";
    time = 0;
}

// 시간(int)을 시, 분, 초 문자열로 변환
function getTimeFormatString() {
    hour = parseInt(String(time / (60 * 60)));
    min = parseInt(String((time - (hour * 60 * 60)) / 60));
    sec = time % 60;
    timerTxt= String(hour).padStart(2, '0') + ":" + String(min).padStart(2, '0') + ":" + String(sec).padStart(2, '0');

    return timerTxt;
}
```

1. 함수 startClock에서 setTimeout으로 time 1초마다 커짐

2. stopClock 계속 실행되도 하단에 setTimeout 실행되고 있기에 시계 멈추지 않음

3. getTimeFormatString에서 사용된 padStart
```js
//padStart()
const str1 = '5';

console.log(str1.padStart(2, '0'));
// Expected output: "05"

const fullNumber = '2034399002125581';
const last4Digits = fullNumber.slice(-4);
const maskedNumber = last4Digits.padStart(fullNumber.length, '*');

console.log(maskedNumber);
// Expected output: "************5581"


//padEnd()
const str1 = 'Breaded Mushrooms';

console.log(str1.padEnd(25, '.'));
// Expected output: "Breaded Mushrooms........"

const str2 = '200';

console.log(str2.padEnd(5));
// Expected output: "200  "


```
현재 문자열에 다른 문자열을 채워, 주어진 길이를 만족하는 새로운 문자열을 반환

padStart(좌측부터) padEnd(우측부터)


<br>

---

<br>

### localStorage 기록저장
```js
const Record_KEY = "records"
let recordsArr = [];

function saveRecord(){

  const records = {
      card: optionVal * 2, 
      hint: hintCount== 2 ? 0 : 2 - hintCount,
      life: opportunity,
      time: timerTxt,
    };

  recordsArr.push(records);

  localStorage.setItem(Record_KEY, JSON.stringify(recordsArr));

  addRecord(records);
}

function addRecord(record) {
  const tableRow = document.createElement('tr');

  const cells = [
    { className: 'card_num', text: '장' },
    { className: 'hint_num', text: '번' },
    { className: 'life_num', text: '번' },
    { className: 'time', text: '' }
  ];

  cells.forEach(cell => {
    const td = document.createElement('td');
    const span = document.createElement('span');
    span.className = cell.className;
    td.appendChild(span);
    td.appendChild(document.createTextNode(cell.text));
    tableRow.appendChild(td);
  });

  const table = document.querySelector('.result .record table tbody');
  table.appendChild(tableRow);

  const recordCells = tableRow.querySelectorAll('td > span');
  recordCells[0].innerText = record.card;
  recordCells[1].innerText = record.hint;
  recordCells[2].innerText = record.life;
  recordCells[3].innerText = record.time;
}

const saveRecords =localStorage.getItem(Record_KEY)

if(saveRecords){
  const parseRecords = JSON.parse(saveRecords);
  recordsArr = parseRecords;
  parseRecords.forEach(addRecord);
}
```
Record_KEY로 localStorage에 const records 형태로 저장.

localStorage에 Record_KEY 가 있으면 addRecord()로 기록출력

<br>

**1. setItem(key, value)**

```js
localStorage.setItem(Record_KEY, JSON.stringify(recordsArr));

//JSON.stringify(): JavaScript 값이나 객체를 JSON 문자열로 변환

```
storage에 저장된 데이터는 모두 문자열만 사용 가능하여 value인 data를 문자열로 변환해 주어야함


<br>

**2. getItem(key)**

```js
const saveRecords =localStorage.getItem(Record_KEY)

const parseRecords = JSON.parse(saveRecords);
//JSON.parse(): JSON 문자열의 구문을 분석하고, 그 결과에서 JavaScript 값이나 객체를 생성
```

getItem을 통해 해당 키에 있는 데이터들을 불러올 수 있음

<br>

### localStorage와 sessionStorage
**공통점**

- 키와 값은 반드시 문자열이어야 합니다.
- 제한 용량은 5MB 이상인데, 브라우저에 따라 다를 수 있습니다.
- 파기되지 않습니다.
- 오리진(도메인·포트·프로토콜)에 묶여있습니다.
- 서버가 HTTP 헤더를 통해 스토리지 객체를 조작할 수 없음. 웹 스토리지 객체 조작은 모두 자바스크립트 내에서 수행

**차이점**
|localStorage|sessionStorage|
|------|------|
|오리진이 같은 탭, 창 전체에서 공유됩니다.|오리진이 같은 브라우저 탭, iframe에서 브라우저를 껐다 켜도 남아있습니다.|
|브라우저를 껐다 켜도 남아있습니다.|페이지를 새로 고침 해도 남아있습니다. 하지만 탭이나 브라우저를 종료하면 사라집니다.|

[참고](https://ko.javascript.info/localstorage)


<br>

---

<br>



## v6 목표
### 리액트
- 지금까지 작업 총 정리
- 리액트로 작업시작
- ㄴ 관련 훅 찾아보기
- ㄴ 컴포넌트 어떻게 나눌지 정리