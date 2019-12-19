import React, { Component } from 'react';
import styled from 'styled-components';

const Loading = styled.span`
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%, -50%);
    color:#FFF;
    font-size:15px;
    opacity:0.7;
    font-family:'Lato', sans-serif;
`;

export default class ModuleLoading extends Component{

    render(){
        return (
            <Loading>{this.props.text}</Loading>
        );
    }
}