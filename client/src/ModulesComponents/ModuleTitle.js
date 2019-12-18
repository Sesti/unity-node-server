import React, { Component } from "react";
import styled from 'styled-components';

const Title = styled.h2`
    font-size:20px;
    text-align:left;
    margin:0;
    color:${props => props.color};
    width:100%;
    flex: 0 1 100%;
    opacity:1;
`;

export default class ModuleTitle extends Component{

    render(){
        return(
            <Title color={this.props.color}>{this.props.name}</Title>
        );
    };
}