import React from 'react'

const Result = ({reload, img, num, hint, life, time, getTimeFormatString}) => {

  return (
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
                        <th>카드 장수</th>
                        <th>힌트사용</th>
                        <th>틀린 개수</th>
                        <th>걸린 시간</th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{img}</td>
                    <td>{num*2} 장</td>
                    <td>{hint} 번</td>
                    <td>{life} 개</td>
                    <td>{getTimeFormatString(time)}</td>
                </tr>                        
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Result;