import React, {useMemo} from 'react'
import styled from 'styled-components'

import Reader from './Reader.js'

const StyledPage = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
`

// will only be called when text or wordsPerLine changes
const compute = (text, wordsPerLine, linesPerPage) => { 
  const words = text.trim().split(" ")

  var chars = 0
  var lines = [[]]
  var pages = []
  
  var currentLine = 0
  var currentPage = 0

  var index = {
    pageLine2word: [[]], // not unique 
    word2PageLine: [], 
    word2page: [],
    page2word: []
  } 

  words.forEach((e, i) => { 
    // adding word to current line
    chars = chars + e.length
    index.word2PageLine.push(currentLine)
    index.word2page.push(currentPage)
    lines[currentLine].push({content: e, index: i})

    // if more chars than wordsPerLine then break line
    if(chars > wordsPerLine) {
      index.pageLine2word[currentPage].push(lines[currentLine][0].index)
      lines.push([])
      currentLine = currentLine + 1
      chars = 0

      if(currentLine > linesPerPage) {
        index.page2word.push(lines[0][0].index)
        index.pageLine2word.push([])
        pages.push(lines)
        currentPage = currentPage + 1
        lines = [[]]
        currentLine = 0
        chars = 0
      }
    } 
  })

  return({pages, index})
}

export default ({cursor, text, wordsPerLine, linesPerPage, onIndexUpdate}) => {
  const memo = useMemo(() => {
    if(text == null) {
      return null
    }
    const {pages, index} = compute(text, wordsPerLine, linesPerPage)
    onIndexUpdate(index) 
    return({pages, index})
  }, [text, wordsPerLine, onIndexUpdate, linesPerPage])

  if(memo != null) { 
    const page = memo.index.word2page[cursor]
    return(
      <StyledPage>
      <Reader 
        lines={memo.pages[page]}
        index={memo.index}
        cursor={cursor}
        hash={page}/>
      page {page}
      </StyledPage>
    )
  } else {
    return(<StyledPage><div>Loading</div></StyledPage>)
  }
}
