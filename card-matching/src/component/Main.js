import React from 'react'
import CardList from "./CardList";
import GameOver from './GameOver';
import Result from './Result';
import { createContext, useState} from 'react';

const Main = () => {
    const cardNum =[0,6,7,8,9];
    const cardImg = [0 , "포켓몬", "마리오"] 
    const [num, setNum] = useState("0");
    const [img, setImg] = useState("0");

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

    

    const startGame = ()=>{
        if (num === '0') {
            alert('카드 장수를 선택하시오');
            return false;
        
          }else if(img === '0'){
            alert('카드 이미지를 선택하시오');
            return false;
        
          }

          document.querySelector('.main').style.display = 'none';
          document.querySelector('.card_section').style.display = 'block';


    }



  return (
    <div className='wrap'>
        <div className="main">
            <h2>카드 뒤집기.v5</h2>
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
            onClick={startGame}
            >START</button>
        </div>
        <CardList 
        cardNum={num}
        cardImg={img}
        />
        <GameOver/>
        <Result/>
    </div>
    
    
  )
}

export default Main