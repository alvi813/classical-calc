import React from 'react';
import OutputScreenRow from './outputScreenRow.js';

// use to hold screen row
const OutputScreen = (props) => {
  return (
    <div className="screen">
      <OutputScreenRow value = {props.request}/>
    </div>
  )
}

export default OutputScreen;
