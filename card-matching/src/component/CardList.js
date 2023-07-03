import React from 'react'
import { useState} from 'react';
import Hint from "./Hint";
import StopWatch from "./StopWatch";
import Life from "./Life";
// import { Link } from 'react-router-dom';

const CardList = (props) => {
  let CardNum = props.cardNum;
  let CardImg = props.CardImg;
  let animationStop = true;
  const [isCardOpen, setIsCardOpen] = useState(false);

  const cardOpen = () =>{
    setIsCardOpen(!isCardOpen);
  }


  return (
    <div className="card_section">
      <div className="top_menu">
          <div className="bg"></div>
          <button 
          className="btn_back" 
          >
            go-back
          </button>
          <Hint/>
          <StopWatch/>
          <Life/>
      </div>
      <ul>
        <li>
          <div 
          className={`card_wrap ${isCardOpen ? 'on' : ''}`}
          onClick={cardOpen}
          >
            <div className="front"></div>
            <div className="back"></div>
          </div>
        </li>
      </ul>
  </div>
  )
}

export default CardList;