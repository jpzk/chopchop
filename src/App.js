import React, {useState, useEffect, useCallback} from 'react';
import './App.css';

import Loader from './Loader.js'
import Reader from './Reader.js'
import Options from './Options.js'
import styled, {ThemeProvider} from 'styled-components'

import {themes, fonts, zooms} from './theme.js'
import {useEventListener} from './event.js'

const StyledApp = styled.div`
  padding: 1vw;
  ${props => `
    background-color: ${props.theme.theme.background};
    color: ${props.theme.theme.foreground};
    font-size: ${props.theme.zoom};
    font-family: ${props.theme.font.fontFamily};
  `}
`

export default () => {

  var temptext = ""
  for(var i=0;i<255;i++) { 
    temptext = temptext + "chop ";
  }

  const [text, setText] = useState(temptext) 
  const [cursor, setCursor] = useState(0)
  const [index, setIndex] = useState({
    line2word: [],
    word2line: []
  })

  // global application state
  const [theme, setTheme] = useState(({
    font: fonts.sans,
    theme: themes.light,
    zoom: zooms.normal
  }))

  // cursor handler
  const handler = useCallback(({key}) => {
    if(key === "h" || key === "ArrowLeft") { 
      setCursor((cursor) => cursor > 0 ? cursor - 1 : 0)
    }
    if(key === "l" || key === "ArrowRight") {
      setCursor((cursor) => cursor + 1)
    }
  },[setCursor])

  useEventListener("keydown", handler)
  document.body.style.backgroundColor = theme.background

  return (
    <ThemeProvider theme={theme}>
          <StyledApp>
            <Options setTheme={setTheme}/> 
            <Loader onChange={setText}/>
            <Reader 
              cursor={cursor} 
              text={text} 
              wordsPerLine={45}
              onIndexUpdate={setIndex} 
            />
          </StyledApp>
    </ThemeProvider>
  );
}
