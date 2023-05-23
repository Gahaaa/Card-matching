const selectedElement = document.getElementById("card_option");
let optionVal = selectedElement.options[selectedElement.selectedIndex].value;

selectedElement.addEventListener('change', function() {
  optionVal = selectedElement.options[selectedElement.selectedIndex].value;
});

function setGame() {
  if (optionVal == 0) {
    alert('카드 장수를 선택하시오');
    return false;
  }

  const ulElement = document.querySelector('.card_section > ul');
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
  }, 2000);
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
