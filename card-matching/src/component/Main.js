import React from 'react'
// import CardList from "./CardList";
// import GameOver from './GameOver';
// import Result from './Result';
import {useState, useRef, useEffect } from 'react';

const Main = () => {
    // 카드 장수 값
    const cardNum =[0,6,7,8,9];
    // 카드 이미지 값
    const cardImg = [0 , "포켓몬", "마리오"]
    // 카드 장수 설정
    const [num, setNum] = useState("0");
    // 카드 이미지 설정
    const [img, setImg] = useState("0");

    const [selectedValue, setSelectedValue] = useState(0);

    const [classArr, setClassArr] = useState([]);
    const [selectedIdxs, setSelectedIdxs] = useState([]);

    // 카드 애니메이션
    const [animate, setAnimate] = useState(false);
    // 카드 클릭시 애니메이션
    const [openAni, setOpenAni] = useState(false);

    // 힌트
    const [hint, setHint] = useState(2);
    // 목숨
    const [life, setLife] = useState(0);

    // 타이머
    const [time, setTime] = useState(0);
    // 타이머 재생, 정지
    const [isRunning, setIsRunning] = useState(false);

    let randomIndexArray = [];
    const li = document.querySelectorAll('.card_list li');
    const clearLi = document.querySelectorAll('.card_list li.off');
    const lifeLi = document.querySelectorAll('.life ul li');


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

    

    // 카드 랜덤 class 부여
    const setGame = () =>{

        console.log(img)
        
        if (num === '0') {
        alert('카드 장수를 선택하시오');
        return false;
    
        }else if(img === '0'){
        alert('카드 이미지를 선택하시오');
        return false;
        }
        
    
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
            setClassArr(classArr => [...classArr, randomIndexArray[i] - cardNumber]);
            
        } else {
            setClassArr(classArr => [...classArr, randomIndexArray[i]]);
        
        }
        }

    startGame()
  }

//    카드 클릭 애니메이션 
    const cardOpen = (idx) => {
        
        if (!animate) {
            const liClassOn = li[idx].querySelector('.on');
            const liClassoff = li[idx].classList.contains('off');

            // 중복클릭 && 맞춘 카드방지
            if(liClassOn || liClassoff){
                console.log('중복클릭')
                return false;

            }
            setSelectedIdxs([...selectedIdxs, idx]); // 클릭한 인덱스를 배열에 추가
            cardMatch(idx);
        
            
            
        }
        
    };

    // 짝 맞추기
  const cardMatch = (idx) =>{
    const cardOrder =selectedIdxs[selectedIdxs.length-1];
    
    
    if(li[cardOrder] && selectedIdxs.length % 2 === 1){
        setAnimate(animate => true);
        
        // 맞았을 때
        if(li[idx].value === li[cardOrder].value){
            setTimeout(()=>{
                li[idx].classList.replace(li[idx].classList,'off');
                li[cardOrder].classList.replace(li[cardOrder].classList,'off');
                setAnimate(animate => false);
            },600)

            clearGame();
            
        // 틀렸을 때
        }else{

            setTimeout(()=>{
                setSelectedIdxs([])
                setAnimate(animate => false);
            },600)

            removeLife();
        }

    }
    
    
  }

//   카드 모두 맞춤
  const clearGame = () =>{
    if(clearLi.length+2 === num*2){
        setTimeout(() => {
            document.querySelector('.card_section').style.display = 'none';
            document.querySelector('.result').style.display = 'block';
        }, 600);

        stopTimer();
    }
    
    

  }

//   게임시작(화면 세팅, 카드 애니메이션, 타이머 시작)
  const startGame = () =>{

    document.querySelector('.main').style.display = 'none';
    document.querySelector('.card_section').style.display = 'block';

    startTimer();

    setOpenAni(openAni => true);
    setAnimate(animate => true);
    setTimeout(()=>{
        setOpenAni(openAni => false);
        setAnimate(animate => false);
    }, 2500);

  }

//   힌트 노출
  const useHint = () =>{
    if(hint === 0){
        console.log('힌트소진');

        return false;
    }
    setHint(hint => hint-1);
    setOpenAni(openAni => true);
    setAnimate(animate => true);
    setTimeout(()=>{
        setOpenAni(openAni => false);
        setAnimate(animate => false);
    }, 2500);


  }

//   목숨 카운트 다운
  const removeLife = () =>{
    lifeLi[life].classList.add('off');
    if(life === lifeLi.length-1){
        console.log('목숨xxx')
        setTimeout(()=>{
            gameOver();
        }, 1000);
       

        return false;
    }
    
    setLife(life => life+1);
  }


//   타이머
  useEffect(() => {
    let timerId;

    if (isRunning) {
      timerId = setTimeout(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [time, isRunning]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const getTimeFormatString = (time) => {
    const hour = parseInt(String(time / (60 * 60)));
    const min = parseInt(String((time - (hour * 60 * 60)) / 60));
    const sec = time % 60;
    return `${String(hour).padStart(2, '0')}:${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };
  

//   게임오버 화면
  const gameOver = () =>{
    document.querySelector('.card_section').style.display = 'none';
    document.querySelector('.fail_section').style.display = 'block';
    stopTimer();
  }

//   새로고침
  const reload = () =>{
    document.querySelector('.card_section').style.display = 'none';
    document.querySelector('.fail_section').style.display = 'none';
    document.querySelector('.result').style.display = 'none';
    document.querySelector('.main').style.display = 'block';

    setNum(num => num=0);
    setImg(img => img=0);
    setHint(hint => hint=2);
    setLife(life => life=0);
    setTime(time => time=0);
    setSelectedValue(selectedValue=> selectedValue=0);

    // 목숨 클래스 수정
    // lifeLi.forEach({
    //     lifeLi.classList.remove('off');
    // })
  }
  


  return (
    <div className='wrap'>
        <div className="main">
            <h2>카드 뒤집기</h2>
            <div className="select_area">
                <select
                id='card_option' 
                onChange={handleNum}
                defaultValue={selectedValue}
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
                defaultValue={selectedValue}
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
                onClick={reload}
                >
                    go-back
                </button>
                <div className="hint_section">
                    <button 
                    className={`btn_hint ${hint === 0? 'off': ''}`}
                    onClick={useHint} 
                    >hint
                    </button>
                    <p>남은 힌트 : <strong>{hint}</strong></p>
                </div>
                <div>
                    <p id="stopwatch" >{getTimeFormatString(time)}</p>
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
            className={img === '마리오'? 'card_list mario' : 'card_list'}
            >
                {
                    num !== "0" && img !== "0"
                    ?
                    classArr.map((item, idx) => (
                        <li
                        className={`card0${item}`}
                        value={item}
                        key={`card0${idx}`}
                        >
                            <div 
                            className={`card_wrap ${selectedIdxs.includes(idx) ? 'on' : '' || openAni ? 'on' : ''}`}
                            onClick={() => cardOpen(idx)}
                            >
                                <div className="front"></div>
                                <div className="back"></div>
                            </div>
                        </li>
                    ))
                    :
                    ""
                }
            </ul>
        </div>
        <div className="fail_section">
            <h2>😥Game over😥</h2>
            <button 
            className="button" 
            onClick={reload}>
                RETRY
            </button>
        </div>
        <div className="result">
            <h2>🎉축하합니다🎉</h2>
            <button 
            className="button"
            onClick={reload}>
                RETRY
            </button>
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
                        <td>{img}</td>
                        <td>{hint}</td>
                        <td>{life}</td>
                        <td>{getTimeFormatString(time)}</td>
                    </tr>                        
                    </tbody>
                </table>
            </div>
        </div>

    </div>
    
    
  )
}

export default Main