import React, {useMemo} from 'react'
import styled from 'styled-components'

// used for determining if re-rendering is necessary
const hashCode = s => s.split('').reduce((a,b) => (((a << 5) - a) + b.charCodeAt(0))|0, 0)

const comp = (prevProp, nextProp) =>  
  prevProp.selected === nextProp.selected &&
  prevProp.word === nextProp.word && 
  prevProp.hash === nextProp.hash

const StyledLine = styled.div`
  opacity: 0.3;
  margin-bottom: 0.3rem;
  ${props => props.selected && `
    background-color: ${props.theme.theme.selectedLineBg};
    opacity: 1;
  `}
`
const MemoizedStyledLine = React.memo(StyledLine, comp)

const StyledWord = styled.span`
  margin-right: 0.5vw;
  ${props => props.selected && `
    color: ${props.theme.theme.selectedFg};
    background-color: ${props.theme.theme.selectedBg};
  `}
`
const MemoizedStyledWord = React.memo(StyledWord, comp)

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

const render = (lines, selectedLine, cursor, hash) => {
  const word = (isSelectedLine, cursor) => isSelectedLine ? cursor : -1  
  const Lines = lines.map((line, lineIndex) => 
    <MemoizedStyledLine 
        selected={lineIndex === selectedLine}
        key={lineIndex}
        hash={hash}
        word={word(lineIndex === selectedLine, cursor)}
      >
      {line.map(({content, index}) => {
        return(<MemoizedStyledWord 
          selected={index === cursor}
          hash={hash}
          key={index}>{content}</MemoizedStyledWord>)
      })}
    </MemoizedStyledLine>
  )
  return(Lines)
}

export default ({cursor, text, wordsPerLine, onIndexUpdate}) => {
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
    render(memo.lines, memo.index.word2line[cursor], cursor, hash)
  : "No Text"

  return(<StyledReader>{rendered}</StyledReader>)
}

