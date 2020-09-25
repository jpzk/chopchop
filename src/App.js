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
  const [index, setIndex] = useState(null)

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

  const moveLine = (index, cursor, direction) => {
    const page = index.word2page[cursor]
    // go up
    if(direction === -1) { 
      const firstPage = page === 0 
      const firstLine = index.word2PageLine[cursor] === 0

      if(firstLine && firstPage) {
        return(cursor)
      } else if(firstLine) { 
        return(index.page2lastword[page - 1])
      } else {
        return(index.pageLine2word[page][index.word2PageLine[cursor] - 1])
      }
    } else { // go down
      const lastPage = page === index.page2word.length - 1
      const lastLine = index.word2PageLine[cursor] + 1 === index.pageLine2word[page].length
      if(lastLine && lastPage) {
        return(cursor)
      } else if(lastLine) { 
        return(index.page2word[page + 1])
      } else {
        return(index.pageLine2word[page][index.word2PageLine[cursor] + 1])
      }
    }
  }

  // cursor handler
  const handler = useCallback(({key}) => {
    if(key === "h" || key === "ArrowLeft") { 
      setCursor((cursor) => cursor > 0 ? cursor - 1 : 0)
    }
    if(key === "l" || key === "ArrowRight") {
      setCursor((cursor) => cursor + 1 < index.word2page.length ? 
        cursor + 1 : cursor)
    }
    if(key === "j") { 
      setCursor((cursor) => moveLine(index, cursor, 1))
    }
    if(key === "k") { 
      setCursor((cursor) => moveLine(index, cursor, -1))
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
              linesPerPage={25}
              onIndexUpdate={setIndex} 
            />
          </StyledApp>
    </ThemeProvider>
  );
}
