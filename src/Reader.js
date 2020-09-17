import React from 'react';
import styled from 'styled-components'

//const Word = ({selected, chunk}) => <div>{chunk}</div>
const StyledWord = styled.div`
  display: inline-block;
  margin-right: 0.5vw;
  ${props => props.selected && `
    color: ${props.theme.theme.selectedFg};
    background-color: ${props.theme.theme.selectedBg};
  `}
`
const renderNoText = () => "Please copy text in loader"
const renderText = (cursor, text) => { 
  const words = text.split(" ") 
  return(words.map((w, index) => 
      <StyledWord selected={cursor === index} key={index}>{w}</StyledWord>
    )
  )
}
const StyledReader = styled.div`
  padding: 4vw;
`
export default ({cursor, text}) => 
  <StyledReader>
    {text == null ? renderNoText() : renderText(cursor,text)}
  </StyledReader>

