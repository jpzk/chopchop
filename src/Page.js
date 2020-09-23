import React, {useMemo} from 'react'
import styled from 'styled-components'

import Reader from './Reader.js'

// used for determining if re-rendering is necessary
const hashCode = s => s.split('').reduce((a,b) => (((a << 5) - a) + b.charCodeAt(0))|0, 0)

const StyledPage = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%,0);
`

// will only be called when text or wordsPerLine changes
const compute = (text, wordsPerLine) => { 
  const words = text.trim().split(" ")
  var chars = 0
  var lines = [[]]
  var currentLine = 0
  var index = {line2word: [], word2line: []} 

  words.forEach((e, i) => { 
    chars = chars + e.length
    index.word2line.push(currentLine)
    lines[currentLine].push({content: e, index: i})
    if(chars > wordsPerLine) {
      index.line2word.push(lines[currentLine][0].index)
      lines.push([])
      currentLine = currentLine + 1
      chars = 0
    } 
  })

  return({lines, index})
}

export default ({cursor, text, wordsPerLine, linesPerPage, onIndexUpdate}) => {
  const hash = useMemo(() => (text != null) ? hashCode(text) : null , [text])
  const memo = useMemo(() => {
    if(text == null) {
      return null
    }
    const {lines, index} = compute(text, wordsPerLine)
    onIndexUpdate(index) 
    return({lines, index})
  }, [text, wordsPerLine, onIndexUpdate])

  const rendered = (memo != null) ? 
    <Reader 
    lines={memo.lines}
    index={memo.index}
    cursor={cursor}
    hash={hash}/>
  : "No Text"
  return(<StyledPage>{rendered}</StyledPage>)
}
