import React, {useContext} from 'react';
import './App.css';

import {FontContext,ThemeContext} from './theme.js';

const Word = ({selected, chunk}) => { 
  const theme = useContext(ThemeContext)
  var style = {
    display: "inline-block",
    marginRight: "0.5vw",
  }
  if(selected) {
    var style = {
      backgroundColor: theme.selectedBg,
      color: theme.selectedFg,
      ...style}
  }
  return(<div style={style}>{chunk}</div>)
}

const renderNoText = () => {return(<div>Please copy text in loader</div>)}

const renderText = (cursor, text) => { 
  const words = text.split(" ") 
  return(<div>{
    words.map((w, index) => {
      return(<Word selected={cursor === index} chunk={w}/>)
    })
  }</div>)
}

export default ({cursor, text, ...restOfProps}) => (<div id="reader" {...restOfProps}>
    {text == null ? renderNoText() : renderText(cursor, text)}
    </div>)

