import React from 'react'
import {Link} from 'react-router-dom';

const GameOver = () => {

  return (
    <div className='wrap'>
      <div className="fail_section">
            <h2>😥Game over😥</h2>
            <Link className="button" to="/">RETRY</Link>
        </div>
    </div>
  )
}

export default GameOver;