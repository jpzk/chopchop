import React, {useRef, useMemo, useState, useEffect, useCallback} from 'react';
import './App.css';

import Loader from './Loader.js'
import Reader from './Reader.js'
import Options from './Options.js'
import styled from 'styled-components'

import {themes, fonts, zooms, ZoomContext, FontContext, ThemeContext} from './theme.js'

function useEventListener(eventName, handler, element = window){
  const savedHandler = useRef();
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);
  useEffect(
    () => {
      const isSupported = element && element.addEventListener;
      if (!isSupported) return;
      const eventListener = event => savedHandler.current(event);
      element.addEventListener(eventName, eventListener);
      return () => {
        element.removeEventListener(eventName, eventListener);
      };
    },
    [eventName, element] // Re-run if eventName or element changes
  );
};

export default () => {
  const temptext = "State also contains the updater function so it will"
  const [text, setText] = useState(temptext) 
  const [cursor, setCursor] = useState(0)

  // theming
  const [font, setFont] = useState(fonts["sans"])
  const [theme, setTheme] = useState(themes["light"])
  const [zoom, setZoom] = useState(zooms["normal"])

  // cursor handler
  const handler = useCallback(({key}) => {
    if(key === "h" || key == "ArrowLeft") { 
      setCursor((cursor)=>cursor > 0 ? cursor - 1 : 0)
    }
    if(key === "l" || key == "ArrowRight") {
      setCursor((cursor)=>cursor + 1)
    }
  },[setCursor])
  useEventListener("keydown", handler)

  const style = useMemo(()=>({
    backgroundColor: theme.background,
    color: theme.foreground,
    fontSize: zoom,
    fontFamily: font.fontFamily,
    padding: "1vw",
  }),[theme,font,zoom])
  document.body.style.backgroundColor = theme.background

  return (
    <ThemeContext.Provider value={theme}>
      <FontContext.Provider value={font}>
        <ZoomContext.Provider value={zoom}>
          <div className="App" style={style}>
            <Options 
              setFont={n=> setFont(fonts[n])} 
              setTheme={n=> setTheme(themes[n])}
              setZoom={n=> setZoom(zooms[n])}
            />
            <Loader onChange={setText}/>
            <Reader cursor={cursor} text={text} />
          </div>
        </ZoomContext.Provider>
      </FontContext.Provider>
    </ThemeContext.Provider>
  );
}
