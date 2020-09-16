import React, {useContext} from 'react';
import './App.css';

import {FontContext,ThemeContext} from './theme.js'

export default ({onChange}) => {
  const theme = useContext(ThemeContext)
  const font = useContext(FontContext)
  const style = {
    fontFamily: font.fontFamily,
    backgroundColor: theme.background,
    color: theme.foreground
  }
  return(<input id="loader" style={style} type="text" onChange={e => onChange(e.target.value)}/>)
}
