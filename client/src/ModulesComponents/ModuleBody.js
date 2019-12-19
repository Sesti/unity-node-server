import React, { Component } from 'react';
import styled from 'styled-components';

const Body = styled.div`
    display:flex;
    width:100%;
`;

export default class ModuleBody extends Component{

    render(){
        return(
            <Body>
                {this.props.children}
            </Body>
        );
    }
}