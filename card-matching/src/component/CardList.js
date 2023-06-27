import React from 'react'
import Hint from "./Hint";
import StopWatch from "./StopWatch";
import Life from "./Life";

const CardList = () => {

  return (
    <div className='wrap'>
      <div className="card_section">
            <div className="top_menu">
                <div className="bg"></div>
                <a className="btn_back" href="#;">go-back</a>
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