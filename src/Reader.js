import React, {useMemo} from 'react';
import styled from 'styled-components'

const StyledLine = styled.div`
  ${props => props.selected && `
    background-color: ${props.theme.theme.selectedLineBg};
  `}
`
const Line = ({selected, children}) => <StyledLine>{children}</StyledLine>

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
  const words = text.split(" ")
  var chars = 0
  var lines = []
  var line = []
  var index = {line2word: [], word2line: []} 

  index.line2word.push(0)
  words.forEach((e, i) => { 
    index.word2line.push(lines.length)
    chars = chars + e.length   
    line.push({content: e, index: i})
    if(chars > wordsPerLine) {
      chars = 0
      lines.push(line)
      index.line2word.push(i+1)
      line = []
    } 
  })
  return({lines, index})
}

const StyledReader = styled.div`
  padding: 5vw;
  text-align: center;
`
export default ({cursor, text, wordsPerLine, onIndexUpdate}) => {
  var rendered = ""
  if(text != null) {
    const {lines, index} = useMemo(() => compute(text, wordsPerLine), [text, wordsPerLine])
    onIndexUpdate(index)

    rendered = lines.map((l,i) => {
      return(
        <StyledLine selected={i === index.word2line[cursor]}>
        {l.map((w, i) => 
          <StyledWord selected={w.index === cursor}>{w.content}</StyledWord>)
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

