import React from 'react';
import styled from 'styled-components';

const StyledLoader = styled.div`
  ${props => `
    background-color: ${props.theme.theme.background}
  `}
`
export default ({onChange}) => 
  <StyledLoader>
    <input id="loader" type="text" onChange={e => onChange(e.target.value)}/>
  </StyledLoader>

