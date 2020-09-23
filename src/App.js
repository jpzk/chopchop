import React, {useMemo, useState, useCallback} from 'react'
import styled, {ThemeProvider} from 'styled-components'
import axios from 'axios'

import Loader from './Loader.js'
import Options from './Options.js'
import Page from './Page.js'

import {themes, fonts, zooms} from './theme.js'
import {useEventListener} from './event.js'

import './App.css';

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
  const [text, setText] = useState(null) 
  const [cursor, setCursor] = useState(0)
  const [index, setIndex] = useState({
    line2word: [],
    word2line: []
  })

  useMemo(() => {
    axios.get("/api/goget?urlpath=https://0xff.nu/microblogging")
      .then(response => {
        setText(JSON.stringify(response.data));
    }, error => {
      console.log(error);
    });
  },[])

  // global application state
  const [theme, setTheme] = useState(({
    font: fonts.mono,
    theme: themes.dark,
    zoom: zooms.normal
  }))

  // cursor handler
  const handler = useCallback(({key}) => {
    if(key === "h" || key === "ArrowLeft") { 
      setCursor((cursor) => cursor > 0 ? cursor - 1 : 0)
    }
    if(key === "l" || key === "ArrowRight") {
      setCursor((cursor) => 
        cursor === index.word2line.length - 1 ? cursor : cursor + 1)
    }
    if(key === "j") { 
      setCursor((cursor) => 
        index.word2line[cursor] + 1 === index.line2word.length  ? 
          cursor : 
        index.line2word[index.word2line[cursor] + 1]) 
    }
    if(key === "k") { 
      setCursor((cursor) => 
        index.word2line[cursor] === 0 ? 
          cursor : 
        index.line2word[index.word2line[cursor] - 1]) 
    }
  },[setCursor, index])

  useEventListener("keydown", handler)
  document.body.style.backgroundColor = theme.theme.background

  return (
    <ThemeProvider theme={theme}>
          <StyledApp>
            <Options setTheme={setTheme}/> 
            <Loader onChange={e => {setText(e); setCursor(0)}}/>
            <Page
              cursor={cursor} 
              text={text} 
              wordsPerLine={45}
              linesPerPage={20}
              onIndexUpdate={setIndex} 
            />
          </StyledApp>
    </ThemeProvider>
  );
}
