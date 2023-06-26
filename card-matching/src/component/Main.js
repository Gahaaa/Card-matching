import React from 'react'
import {Link} from 'react-router-dom';

const Main = () => {
    const cardNum =[0,6,7,8,9];
    const cardImg = [0 , "포켓몬", "마리오"] 


  return (
    <div className='wrap'>
        <div className="main">
            <h2>카드 뒤집기.v5</h2>
            <div className="select_area">
                <select id="card_option">
                {cardNum.map((item) => (
                        <option 
                        value={item} 
                        key={item}
                        disabled={item==0?true:false}
                        >
                            {item == 0? "장수선택" : item*2 + "장"}
                        </option>
                    ))}
                </select>
                <select id="card_option2">
                {cardImg.map((item) => (
                        <option 
                        value={item} 
                        key={item}
                        disabled={item==0?true:false}
                        >
                            {item == 0? "카드 이미지" : item}
                        </option>
                    ))}
                </select>
            </div>
            <Link className="button" to="/card">START</Link>
        </div>
    </div>
    
    
  )
}

export default Main