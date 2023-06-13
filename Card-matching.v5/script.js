
// 옵션1 카드 장수
const selectedElement = document.getElementById("card_option");
let optionVal = selectedElement.options[selectedElement.selectedIndex].value;

// 옵션2 카드 이미지
const selectedElement2 = document.getElementById("card_option2");
let optionVal2 = selectedElement2.options[selectedElement2.selectedIndex].value;

selectedElement.addEventListener('change', function() {
  optionVal = selectedElement.options[selectedElement.selectedIndex].value;
});

selectedElement2.addEventListener('change', function() {
  optionVal2 = selectedElement2.options[selectedElement2.selectedIndex].value;
});

// 카드 세팅
function setGame() {

  const mainBtn= document.querySelector('.main .button'); 
  const ulElement = document.querySelector('.card_section > ul');
  
  if (optionVal == 0) {
    alert('카드 장수를 선택하시오');
    mainBtn.preventDefault();

  }else if(optionVal2 == 0){
    alert('카드 이미지를 선택하시오');
    mainBtn.preventDefault();

  }else if(optionVal2 == 2){
    ulElement.classList.add('mario')

  }
  
  ulElement.innerHTML = ''; // 기존 카드 엘리먼트 초기화

  const cardNumber = optionVal;

  // 카드 인덱스 배열 생성
  let randomIndexArray = [];
  for (let i = 0; i < cardNumber * 2; i++) {
    let randomNum = Math.floor(Math.random() * (cardNumber * 2)) + 1;
    if (randomIndexArray.indexOf(randomNum) === -1) {
      randomIndexArray.push(randomNum);
    } else {
      i--;
    }
  }

  let classArr = [];
  for (let i = 0; i < cardNumber * 2; i++) {
    // 카드 클래스 생성
    if (randomIndexArray[i] > cardNumber) {
      classArr.push(randomIndexArray[i] - cardNumber);
    } else {
      classArr.push(randomIndexArray[i]);
    }
  }

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

  // 카드 클릭 이벤트 핸들러 등록
  const cardWrap = document.querySelectorAll('.card_section > ul > li .card_wrap');
  cardWrap.forEach(function(item) {
    item.addEventListener('click', cardOpen);
  });
}

let elArr = [];
let animationStop = false;
let opportunity =0;
let lifeIndex =document.querySelectorAll('.card_section .top_menu .life li').length;
let hintCount= 2;
const hintBtn= document.querySelector('.hint_section .btn_hint');
const hintNum = document.querySelector('.top_menu .hint_section p strong');
const backBtn = document.querySelector('.top_menu .btn_back');
const lifeEl = document.querySelectorAll('.card_section .top_menu .life li');

// 변수 초기화
function reset(){
  elArr = [];
  opportunity =0;
  hintCount= 2;

  lifeEl.forEach(function(item) {
    item.classList.remove('off');
  });

  hintBtn.classList.remove('off');
  hintNum.innerText='2';
  

}


document.querySelector('.main .button').addEventListener('click', function() {
  setGame();

  document.querySelector('.main').style.display = 'none';
  document.querySelector('.card_section').style.display = 'block';
  const cardWrap = document.querySelectorAll('.card_section > ul > li .card_wrap');

  startClock();

  // 카드 처음등장 뒤집는 애니메이션
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
});

function cardOpen() {
  if (!animationStop) {
    this.classList.add('on');
    cardMatch(this);
  }
}


function cardMatch(cardElement) {
  const liClass = cardElement.closest('li').className;

  console.log(liClass)

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
          item.classList.replace(liClass,'off');
        });

        animationStop = false;
      }, 700);
      setTimeout(clearGame, 1000);
    } else {
       // 일치하지 않는 카드 처리
      setTimeout(removeOn, 700);
      opportunity+=1;
      removeLife();
    }
  } else {
    setTimeout(function() {
      animationStop = false;
    }, 200);
  }

  
}

function removeOn() {
  const cardWrap = document.querySelectorAll('.card_section > ul > li .card_wrap');
  
  cardWrap.forEach(function(item) {
    item.classList.remove('on');
  });
  animationStop = false;
}

// 게임완료
function clearGame() {
  const cardWrap = document.querySelectorAll('.card_section > ul > li .card_wrap');
  

  if (document.querySelectorAll('.card_section > ul li.off').length === cardWrap.length) {
    document.querySelector('.card_section').style.display = 'none';
    document.querySelector('.result').style.display = 'block';

    stopClock();
    console.log(opportunity)
    
   
    saveRecord();
  }
  
  
}

function reload() {
  stopClock();
  resetClock();
  window.location.reload();
  // document.querySelector('.result').style.display = 'none';
  // document.querySelector('.fail_section').style.display = 'none';
  // document.querySelector('.card_section').style.display = 'none';
  // document.querySelector('.main').style.display = 'block';
  // reset();

}

// 목숨 제거
function removeLife(){
  if(opportunity == lifeIndex){
    setTimeout(function(){
      document.querySelector('.card_section').style.display = 'none';
      document.querySelector('.fail_section').style.display = 'block';
      stopClock();
      return false;

    }, 800)
  }

  setTimeout(function(){
    lifeEl.item(opportunity-1).classList.add('off')
    
  }, 300)
};

// 힌트 클릭이벤트
hintBtn.addEventListener('click', function(){
  const cardWrap = document.querySelectorAll('.card_section > ul > li .card_wrap');
  
  //힌트소진시
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
  }, 2000);
  hintCount-=1;

  hintNum.innerText=`${hintCount}`
});

// 뒤로가기 버튼
backBtn.addEventListener('click', function(){
  reload();
})


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

// 결과 화면 기록 관련
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

// localStorage기록 있을 시
if(saveRecords){
  const parseRecords = JSON.parse(saveRecords);
  recordsArr = parseRecords;
  parseRecords.forEach(addRecord);
  // 각 기록을 addRecord 함수로 전달하여 테이블에 추가
}