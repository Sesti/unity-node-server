import React, { Component } from 'react';
import Cogwheel from '../Svg/Cogwheel';
import styled from 'styled-components';

const StyledCogwheel = styled.button`
    background:none;
    border:none;
    appearence:none;
    cursor:pointer;
    position:absolute;
    right:30px;
    top:50%;
    transform:translateY(-50%);
    outline:none;

    svg{
        transition:0.3s all ease;
        transform:rotate(0deg);
        fill:#00416A;
        opacity:0.3;
    }
    &:hover svg{
        transform:rotate(90deg);
        opacity:1;
    }
`

export default class Settings extends Component{

    render(){
        return (
            <StyledCogwheel>
                <Cogwheel />
            </StyledCogwheel>
        );
    }
    
}