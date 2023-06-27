import React from 'react'
import {Link} from 'react-router-dom';
import ResultRecord from './ResultRecord';

const Result = () => {

  return (
    <div className='wrap'>
      <div className="result" >
            <h2>🎉축하합니다🎉</h2>
            <Link className="button" to="/">RETRY</Link>
            <ResultRecord/>
        </div>
    </div>
  )
}

export default Result;