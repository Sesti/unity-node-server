import React from 'react';
import styled from 'styled-components'

const StyledFadeFooter = styled.span`
    position: absolute;
    bottom: 2%;
    right: 5%;

    font-size:14px;
    color: #CBCBCB;
    opacity: 0.7;
`;
const FadeFooter = ({ children, ...other}) => <StyledFadeFooter {...other}>{children}</StyledFadeFooter>

export default FadeFooter