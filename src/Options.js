import React, {useState, useEffect} from 'react';

import {FontIcon, ThemeIcon, FontSizeIcon} from './Icons.js';
import {zooms, fonts, themes} from './theme.js'

const Option = ({what, init, options, icon, onChange}) => {
  const [state, setState] = useState({options, selected: init, hover: false})
  
  const onEnter = () => {
    setState(s => ({...s, hover: true}))
  }
  const onLeave = () => {
    setState(s => ({...s, hover: false}))
  }
  
  useEffect(() => {
      const nv = {[what]: options[Object.keys(options)[state.selected]]}
      onChange(s => ({...s, ...nv}))
  }, [])

  const handle = () => {
    setState(({options, selected, hover}) => {
      const len = Object.keys(options).length
      const ns = selected == len - 1 ? 0 : selected + 1
      const nv = {[what]: options[Object.keys(options)[ns]]}
      onChange(s => ({...s, ...nv}))
      return({options, selected: ns, hover})
    })
  }

  return(<span onMouseEnter={onEnter} onMouseLeave={onLeave} onClick={() => handle()}>
    {icon({hover: state.hover})}
  </span>)
}

export default ({setTheme}) => {
  const registry = 
    [{what:'font', options: fonts, icon: FontIcon},
     {what:'theme', options: themes, icon: ThemeIcon},
     {what:'zoom', options: zooms, icon: FontSizeIcon}]
  return(
    <>
     {registry.map((k,i) =>  {
      return(<Option what={k.what} 
       init={0} 
       key={i}
       options={k.options} 
       icon={k.icon} 
       onChange={setTheme}/>
     )}
     )}
    </>
  )
}
