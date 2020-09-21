import React from 'react';
import styled from 'styled-components'

const Theme = () => <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M1 12.155c2.256 3.97 4.55 7.918 6.879 11.845h-5.379c-.829 0-1.5-.675-1.5-1.5v-10.345zm2.85.859c3.278 1.952 12.866 7.658 13.121 7.805l-5.162 2.98c-.231.132-.49.201-.751.201-.549 0-1.037-.298-1.299-.75l-5.909-10.236zm1.9-12.813c-.23-.133-.489-.201-.75-.201-.524 0-1.026.277-1.299.75l-3.5 6.062c-.133.23-.201.489-.201.749 0 .527.278 1.028.75 1.3 2.936 1.695 14.58 8.7 17.516 10.396.718.413 1.633.168 2.048-.55l3.5-6.062c.133-.23.186-.488.186-.749 0-.52-.257-1.025-.734-1.3l-17.516-10.395m.25 3.944c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2"/></svg>

const Font = () => 
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M22 0h-20v6h1.999c0-1.174.397-3 2.001-3h4v16.874c0 1.174-.825 2.126-2 2.126h-1v2h9.999v-2h-.999c-1.174 0-2-.952-2-2.126v-16.874h4c1.649 0 2.02 1.826 2.02 3h1.98v-6z"/></svg>

const FontSize = () => 
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20v1h-4v-1h.835c.258 0 .405-.178.321-.422l-.473-1.371h-2.231l-.575-1.59h2.295l-1.362-4.077-1.154 3.451-.879-2.498.921-2.493h2.222l3.033 8.516c.111.315.244.484.578.484h.469zm-6-1h1v2h-7v-2h.532c.459 0 .782-.453.633-.887l-.816-2.113h-6.232l-.815 2.113c-.149.434.174.887.633.887h1.065v2h-7v-2h.43c.593 0 1.123-.375 1.32-.935l5.507-15.065h3.952l5.507 15.065c.197.56.69.935 1.284.935zm-10.886-6h4.238l-2.259-6.199-1.979 6.199z"/></svg>

const StyledSVG = styled.span`
  fill: ${props => props.hover ? 
    props.theme.theme.optionFg :
    props.theme.theme.foreground
  };
  opacity: ${props => props.hover ? 1.0 : 0.5};
  cursor: pointer;
`
const ThemeIcon = ({...p}) => <StyledSVG {...p}><Theme/></StyledSVG>
const FontIcon = (p) => <StyledSVG {...p}><Font/></StyledSVG>
const FontSizeIcon = (p) => <StyledSVG {...p}><FontSize/></StyledSVG>

export {ThemeIcon, FontIcon, FontSizeIcon}
