import React, { Component } from 'react';
import Settings from '../Settings/Settings';
import styled from 'styled-components';

const Header = styled.header`
    background-color: #FFF;
    height:10vh;
    width:100vw;
    box-shadow: 0 -2px 5px 2px rgba(51, 149, 174, 0.4);
    display:flex;
    align-items: center;
    justify-content: center;
    `

const Title = styled.h1`
    margin:0;
    font-family: 'Permanent Marker', cursive;
    background: #ad5389;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #3c1053, #ad5389);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #3c1053, #ad5389); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    -webkit-background-clip: text;
    background-clip:text;
    -webkit-text-fill-color: transparent;
`;

class DashboardHeader extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return (
            <Header>
                <Title>{this.props.name}</Title>
                <Settings></Settings>
            </Header>
        );
    }
}

export default DashboardHeader; 