import React from 'react'
import ResultRecord from './ResultRecord';

const Result = () => {

  return (
    <div className="result" >
        <h2>🎉축하합니다🎉</h2>
        <button className="button">RETRY</button>
        <ResultRecord/>
    </div>
  )
}

export default Result;