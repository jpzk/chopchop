import React, {useMemo} from 'react';
import styled from 'styled-components'

const StyledLine = styled.div`
  opacity: 0.3;
  ${props => props.selected && `
    background-color: ${props.theme.theme.selectedLineBg};
    opacity: 1;
  `}
`
const StyledWord = styled.div`
  display: inline-block;
  margin-right: 0.5vw;
  ${props => props.selected && `
    color: ${props.theme.theme.selectedFg};
    background-color: ${props.theme.theme.selectedBg};
  `}
`
const NoText = "Please copy text in loader"

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

const StyledReader = styled.div`
  padding-left:20%;
  padding-right:20%;
`
export default ({cursor, text, wordsPerLine, onIndexUpdate}) => {
  var rendered = ""
  if(text != null) {
    const {lines, index} = 
      useMemo(() => {
        const {lines, index} = compute(text, wordsPerLine)
        onIndexUpdate(index) 
        return({lines, index})
      }, [text, wordsPerLine])

    rendered = lines.map((l,i) => {
      return(
        <StyledLine key={i} selected={i === index.word2line[cursor]}>
        {l.map((w, i) => 
          <StyledWord key={i} selected={w.index === cursor}>
            {w.content}
          </StyledWord>)
        }
        </StyledLine>)
    })
  } else {
    rendered = NoText;
  }
  return(<StyledReader>
      {rendered}
    </StyledReader>)
}

