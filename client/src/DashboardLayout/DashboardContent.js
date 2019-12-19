import React, { Component } from 'react';
import styled from 'styled-components';

const Content = styled.div`
    height:90vh;
    margin:0.5%;

    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
`;

export default class DashboardContent extends Component{

    render(){
        return (
            <Content>
                {this.props.children}
            </Content>
        );
    }
}