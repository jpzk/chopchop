import React, {useContext} from 'react';
import './App.css';

import {fonts, themes, FontContext,ThemeContext} from './theme.js'

const Selector = ({what, options, onChange}) => {
  return(<select name={what} id={what} onChange={onChange}>
     {options.map(o=> {
       return(<option key={o} value={o}>{o}</option>)
     })}
    </select>)
}

export default ({setFont, setTheme, setZoom}) => {
  const theme = useContext(ThemeContext)
  const font = useContext(FontContext)

  const zooms = {
    normal: "1vw",
    bigger: "2vw",
    extra: "3vw"
  }

  const style = {
    fontFamily: font.fontFamily,
    backgroundColor: theme.background,
    color: theme.foreground
  }
  return(
    <div id="options">
      <Selector what="font" options={Object.keys(fonts)} onChange={e => setFont(e.target.value)}/>
      <Selector what="theme" options={Object.keys(themes)} onChange={e => setTheme(e.target.value)}/>
      <Selector what="zoom" options={Object.keys(zooms)} onChange={e => setZoom(e.target.value)}/>
    </div>
  )
}
