import React, {useMemo} from 'react'
import styled from 'styled-components'

import Reader from './Reader.js'

const StyledPage = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
`

const lines = (words, wordsPerLine) => {
  var chars = 0
  var currentLine = 0
  var lines = [[]]
  words.forEach((el, index) => { 
    chars = chars + el.length 
    lines[currentLine].push({content: el, index})
      if(chars > wordsPerLine) { 
        lines.push([])
        currentLine = currentLine + 1
        chars = 0
      }
  })
  return(lines)
}

const pages = (lines, linesPerPage) => {
  var currentPage = 0
  var curLines = 0
  var pages = [[]]
  lines.forEach(line => {
      pages[currentPage].push(line)
      curLines = curLines + 1  
      if(curLines > linesPerPage) { 
        pages.push([])
        curLines = 0
        currentPage = currentPage + 1
      }
  })
  return(pages)
}

const createWord2page = (pages) => {
  var word2page = [] 
  pages.forEach((p,pageIndex) => {
    p.forEach(l => { 
      l.forEach(w => {
        word2page.push(pageIndex) 
      })
    })
  })
  return(word2page)
}

const createPage2Word = (pages) => {
  var page2word = [] 
  pages.forEach((p, pageIndex) => {
    page2word.push(p[0][0].index)
  })
  return(page2word)
}

const createPage2LastWord = (pages) => {
  var page2word = [] 
  pages.forEach((p, pageIndex) => {
    page2word.push(p.slice().reverse()[0].slice().reverse()[0].index)
  })
  return(page2word)
}

const createWord2PageLine = (pages) => {
  var word2pageLine = []
  pages.forEach(p => {
    p.forEach((l, lineIndex) => { 
      l.forEach(w => {
        word2pageLine.push(lineIndex) 
      })
    })
  })
  return(word2pageLine)
}

const createPageLine2Word = (pages) => {
  var res = []
  pages.forEach((p, pageIndex) => {
    res.push([])
    p.forEach((l, lineIndex) => { 
        res[pageIndex].push(l[0].index)
    })
  })
  return(res)
}

// will only be called when text or wordsPerLine changes
const compute = (text, wordsPerLine, linesPerPage) => { 
  const words = text.trim().split(" ")
  const ls = lines(words, wordsPerLine)
  const ps = pages(ls, linesPerPage)

  var index = {
    pageLine2word: createPageLine2Word(ps),
    word2PageLine: createWord2PageLine(ps), 
    word2page: createWord2page(ps),
    page2word: createPage2Word(ps),
    page2lastword: createPage2LastWord(ps)
  } 
  return({pages: ps, index})
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
      page {page+1}/{memo.pages.length} word {cursor+1}/{memo.index.word2page.length} 
      </StyledPage>
    )
  } else {
    return(<StyledPage><div>Loading</div></StyledPage>)
  }
}
