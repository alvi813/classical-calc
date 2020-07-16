import React from 'react';


// use to show request/answer
const OutputScreenRow = (props) => {
  return (
    <div className="screen-row">
      <input type="text" readOnly value = {props.value}/>
    </div>
  )
}

export default OutputScreenRow;
