import React, { Component } from 'react';
import styled from 'styled-components';

const Element = styled.article`
    overflow: hidden;
    border-radius: 15px;
    position: relative;
    margin: 0.5%;
    height: 30%;
    box-shadow: 1px 1px 1px 1px rgba(0,0,0,0.0);
    transition: 0.3s all ease-in-out;
    background: #FFF;
    ${props => props.size === "1_4" ? "flex:0 1 24%;" : ""}
    ${props => props.size === "1_3" ? "flex:0 1 32%;" : ""}
    ${props => props.size === "1_2" ? "flex:0 1 49%;" : ""}
    ${props => props.size === "1_1" ? "flex:0 1 100%;" : ""}
`;

export default class ModuleElement extends Component{

    render(){
        return(
            <Element size={this.props.size}>
                {this.props.children}
            </Element>
        );
    }

}