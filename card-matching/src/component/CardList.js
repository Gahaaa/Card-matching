import React from 'react'
import Hint from "./Hint";
import StopWatch from "./StopWatch";
import Life from "./Life";
import { Link } from 'react-router-dom';

const CardList = () => {

  return (
    <div className='wrap'>
      <div className="card_section">
            <div className="top_menu">
                <div className="bg"></div>
                <Link 
                className="btn_back" 
                to="/">
                  go-back
                </Link>
                <Hint/>
                <StopWatch/>
                <Life/>
            </div>
            <ul>
            </ul>
        </div>
    </div>
  )
}

export default CardList;