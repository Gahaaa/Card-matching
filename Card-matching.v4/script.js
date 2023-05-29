const selectedElement = document.getElementById("card_option");
let optionVal = selectedElement.options[selectedElement.selectedIndex].value;

const selectedElement2 = document.getElementById("card_option2");
let optionVal2 = selectedElement2.options[selectedElement2.selectedIndex].value;

selectedElement.addEventListener('change', function() {
  optionVal = selectedElement.options[selectedElement.selectedIndex].value;
});

selectedElement2.addEventListener('change', function() {
  optionVal2 = selectedElement2.options[selectedElement2.selectedIndex].value;
});

function setGame() {

  const mainBtn= document.querySelector('.main .button'); 
  const ulElement = document.querySelector('.card_section > ul');
  console.log(optionVal2)


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
const cardWrap = document.querySelectorAll('.card_section > ul > li .card_wrap');
const hintBtn= document.querySelector('.hint_section .btn_hint');

document.querySelector('.main .button').addEventListener('click', function() {
  setGame();

  document.querySelector('.main').style.display = 'none';
  document.querySelector('.card_section').style.display = 'block';
  const cardWrap = document.querySelectorAll('.card_section > ul > li .card_wrap');
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
  elArr.push(liClass);
  animationStop = true;

  if (elArr.length % 2 === 0) {
    if (elArr[elArr.length - 1] === elArr[elArr.length - 2]) {
      // 일치하는 카드 처리
      setTimeout(function() {
        document.querySelectorAll(`.${liClass}`).forEach(function(item) {
          item.classList.add('off');
        });
        animationStop = false;
      }, 800);
      setTimeout(clearGame, 1000);
    } else {
      // 일치하지 않는 카드 처리
      setTimeout(removeOn, 800);
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
  cardWrap.forEach(function(item) {
    item.classList.remove('on');
  });
  animationStop = false;
}

function clearGame() {
  const cardWrap = document.querySelectorAll('.card_section > ul > li .card_wrap');
  if (document.querySelectorAll('.card_section ul li.off').length === cardWrap.length) {
    document.querySelector('.card_section').style.display = 'none';
    document.querySelector('.result').style.display = 'block';
  }
}

function reload() {
  window.location.reload();
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

// 힌트 클릭이벤트
hintBtn.addEventListener('click', function(){
  // 카드 뒤집는 이벤트
  hintCount-=1;

  document.querySelector('.top_menu .hint_section p strong').innerText=`${hintCount}`
})