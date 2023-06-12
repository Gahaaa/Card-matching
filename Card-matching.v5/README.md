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


## v6 목표
### 리액트
- 지금까지 작업 총 정리
- 리액트로 작업시작
- ㄴ 관련 훅 찾아보기
- ㄴ 컴포넌트 어떻게 나눌지 정리