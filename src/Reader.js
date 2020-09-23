import React from 'react'
import styled from 'styled-components'

const comp = (prevProp, nextProp) =>  
  prevProp.selected === nextProp.selected &&
  prevProp.word === nextProp.word && 
  prevProp.hash === nextProp.hash

const StyledLine = styled.div`
  opacity: 0.5;
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

export default ({lines, index, cursor, hash}) => 
  <>
    {render(lines, index.word2line[cursor], cursor, hash)}
  </>
