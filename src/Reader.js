import React, {useMemo} from 'react';
import styled from 'styled-components'

// render a partial
const wordComp = (prevProp, nextProp) => { 
  return(prevProp.selected === nextProp.selected)
}
const lineComp = (prevProp, nextProp) => { 
  return(prevProp.selected === nextProp.selected &&
  prevProp.word === nextProp.word
  )
}
const StyledPartial = styled.div`
  border: solid 1px red;
`
const MemoizedPartial = React.memo(StyledPartial,wordComp)

const StyledLine = styled.div`
  opacity: 0.3;
  margin-bottom: 0.3rem;
  ${props => props.selected && `
    background-color: ${props.theme.theme.selectedLineBg};
    opacity: 1;
  `}
`

const MemoizedStyledLine = React.memo(StyledLine,lineComp)

const StyledWord = styled.span`
  margin-right: 0.5vw;
  ${props => props.selected && `
    color: ${props.theme.theme.selectedFg};
    background-color: ${props.theme.theme.selectedBg};
  `}
`
const MemoizedStyledWord = React.memo(StyledWord,wordComp)

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
  position: absolute;
  left: 50%;
  transform: translate(-50%,0);
`

export default ({cursor, text, wordsPerLine, onIndexUpdate}) => {
  const memo = useMemo(() => {
    if(text == null) {
      return null
    }
    const {lines, index} = compute(text, wordsPerLine)
    onIndexUpdate(index) 
    return({lines, index})
  }, [text, wordsPerLine, onIndexUpdate])

  if(memo != null) {
    const selectedLine = memo.index.word2line[cursor]
    return(<StyledReader> 
      {memo.lines.map((line, lineIndex)=> 
      <MemoizedStyledLine selected={lineIndex === selectedLine}>
        {line.map(({content, index}) => {
          return(<MemoizedStyledWord 
            selected={index === cursor}
            key={index}>{content}</MemoizedStyledWord>)
        })}
      </MemoizedStyledLine>
      )}
    </StyledReader>)
  } else {
    return(<StyledReader>No Text</StyledReader>)
  }
}

