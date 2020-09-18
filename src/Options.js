import React, {useState} from 'react';

import {FontIcon, ThemeIcon, FontSizeIcon} from './Icons.js';
import {zooms, fonts, themes} from './theme.js'

const Option = ({what, init, options, icon, onChange}) => {
  const [state, setState] = useState(init)
 
  const len = options.length
  const handle = () => {
    setState(state => {
      const ns = state == options.length - 1? 0 : state + 1
      const nv = {[what]: options[Object.keys(options)[ns]]}
      onChange(s => ({...s, ...nv}))

      console.log(ns)
      return(ns)
    })
  }

  return(<span onClick={() => handle()}>{icon}</span>)
}

export default ({setTheme}) => {
  const registry = 
    [{what:'font', options: fonts, icon: <FontIcon/>},
     {what:'theme', options: themes, icon: <ThemeIcon/>},
     {what:'zoom', options: zooms, icon: <FontSizeIcon/>}]
  return(
    <div id="options">
     {registry.map((k,i) => 
      <Option what={k.what} 
       init={0} 
       key={i}
       options={k.options} 
       icon={k.icon} 
       onChange={setTheme}/>
    )}
    </div>
  )
}
