import React, { useMemo, useState, useCallback } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import axios from 'axios'

import Loader from './Loader.js'
import Options from './Options.js'
import Page from './Page.js'

import { moveLine } from './control.js'
import { themes, fonts, zooms } from './theme.js'
import { useEventListener } from './event.js'
import queryString from 'query-string';

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
    const params = queryString.parse(window.location.search);
    if(params.url === undefined) {
      window.history.pushState("object or string", "Title", "/?url=http://chopchop.ws/tutorial.txt");
      window.location.href = "/?url=http://chopchop.ws/tutorial.txt"
    }
    axios.get("/api/goget?urlpath=" + params.url)
        .then(response => {
          setText(JSON.stringify(response.data));
        }, error => {
          console.log(error);
        });
  }, [])

  // global application state
  const [theme, setTheme] = useState(({
    font: fonts.mono,
    theme: themes.dark,
    zoom: zooms.normal
  }))

  const handler = useCallback(({ key }) => {
    if (key === "h" || key === "b" || key === "ArrowLeft") {
      setCursor((cursor) => cursor > 0 ? cursor - 1 : 0)
    }
    if (key === "l" || key === "w" || key === "ArrowRight") {
      setCursor((cursor) => cursor + 1 < index.word2page.length ?
        cursor + 1 : cursor)
    }
    if (key === "j" || key === "ArrowDown") {
      setCursor((cursor) => moveLine(index, cursor, 1))
    }
    if (key === "k" || key === "ArrowUp") {
      setCursor((cursor) => moveLine(index, cursor, -1))
    }
  }, [setCursor, index])

  // cursor handler
  useEventListener("keydown", handler)
  document.body.style.backgroundColor = theme.theme.background

  return (
    <ThemeProvider theme={theme}>
      <StyledApp>
        <Options setTheme={setTheme} />
        <Loader onChange={e => { setText(e); setCursor(0) }} />
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
