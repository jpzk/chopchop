import React from 'react';

import {FontIcon, ThemeIcon, FontSizeIcon} from './Icons.js';

import {zooms, fonts, themes} from './theme.js'

export default ({setTheme}) => {
  const registry = 
    [{what:'font', options: fonts},
     {what:'theme', options: themes},
     {what:'zoom', options: zooms}]
  return(
    <div id="options">
    <FontIcon/>
    <ThemeIcon/>
    <FontSizeIcon/>

     {registry.map((k,i) => 
      <select name={k.what} key={k.what} onChange={e => {
        const nv = {[k.what]: k.options[e.target.value]}
        setTheme(s => ({...s, ...nv}))
      }}>
      {Object.keys(k.options).map(o=> {
        return(<option key={o} value={o}>{o}</option>)
      })}
      </select>
    )}
    </div>
  )
}
