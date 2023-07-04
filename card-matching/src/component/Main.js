import React from 'react'
// import CardList from "./CardList";
// import GameOver from './GameOver';
// import Result from './Result';
import {useState, useRef} from 'react';

const Main = () => {
    const cardNum =[0,6,7,8,9];
    const cardImg = [0 , "포켓몬", "마리오"] 
    const [num, setNum] = useState("0");
    const [img, setImg] = useState("0");
    let randomIndexArray = [];
    let classArr = [];

    // 옵션1 카드 장수
    const handleNum = (e) => {
		// event handler
		
        setNum(num => num=e.target.value);
	};

    // 옵션2 카드 이미지
    const handleImg = (e) => {
		// event handler
		
        setImg(img => img=e.target.value);
	};

    

    // 카드 세팅
    const setGame = () =>{

    // const mainBtn= document.querySelector('.main .button'); 
    const ulElement = document.querySelector('.card_section > ul');
    console.log(img)
    
    if (num === '0') {
      alert('카드 장수를 선택하시오');
      return false;
  
    }else if(img === '0'){
      alert('카드 이미지를 선택하시오');
      return false;
    }
    
    ulElement.innerHTML = ''; // 기존 카드 엘리먼트 초기화
  
    const cardNumber = num;
  
    // 카드 인덱스 배열 생성
    
    for (let i = 0; i < cardNumber * 2; i++) {
      let randomNum = Math.floor(Math.random() * (cardNumber * 2)) + 1;
      if (randomIndexArray.indexOf(randomNum) === -1) {
        randomIndexArray.push(randomNum);
      } else {
        i--;
      }
    }
  
    for (let i = 0; i < cardNumber * 2; i++) {
      // 카드 클래스 생성
      if (randomIndexArray[i] > cardNumber) {
        classArr.push(randomIndexArray[i] - cardNumber);
      } else {
        classArr.push(randomIndexArray[i]);
      }
    }
  
    console.log(classArr)
  
    // 카드 클릭 이벤트 핸들러 등록
    // const cardWrap = document.querySelectorAll('.card_section > ul > li .card_wrap');
    // cardWrap.forEach(function(item) {
    //   item.addEventListener('click', cardOpen);
    // });
  }

  const createCard = () =>{

  }



  return (
    <div className='wrap'>
        <div className="main">
            <h2>카드 뒤집기</h2>
            <div className="select_area">
                <select
                id='card_option' 
                onChange={handleNum}
                defaultValue="0"
                >
                {cardNum.map((item) => (
                        <option 
                        value={item} 
                        key={item}
                        >
                            {item === 0? "장수선택" : item*2 + "장"}
                        </option>
                    ))}
                </select>
                <select
                onChange={handleImg}
                defaultValue="0"
                >
                {cardImg.map((item) => (
                        <option 
                        value={item} 
                        key={item}
                        >
                            {item === 0? "카드 이미지" : item}
                        </option>
                    ))}
                </select>
            </div>
            <button 
            className="button" 
            onClick={setGame}
            >START</button>
        </div>
        <div className="card_section">
            <div className="top_menu">
                <div className="bg"></div>
                <button 
                className="btn_back" 
                >
                    go-back
                </button>
                <div className="hint_section">
                    <button className="btn_hint" href="#;">hint</button>
                    <p>남은 힌트 : <strong>2</strong></p>
                </div>
                <div>
                    <p id="stopwatch" >00:00:00</p>
                </div>
                <div className="life">
                    <ul>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
            </div>
            <ul
            className={img === '마리오'? 'mario' : ''}
            >
                <li>
                    <div 
                    className='card_wrap'
                    >
                        <div className="front"></div>
                        <div className="back"></div>
                    </div>
                </li>
            </ul>
        </div>
        <div className="fail_section">
            <h2>😥Game over😥</h2>
            <button className="button" to="/">RETRY</button>
        </div>
        <div className="result">
            <h2>🎉축하합니다🎉</h2>
            <button className="button">RETRY</button>
            <div className="record">
                <h3>기록</h3>
                <table>
                    <thead>
                        <tr>
                            <th>카드</th>
                            <th>힌트사용</th>
                            <th>틀린 개수</th>
                            <th>걸린 시간</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr>
                        
                    </tr>                        
                    </tbody>
                </table>
            </div>
        </div>

    </div>
    
    
  )
}

export default Main