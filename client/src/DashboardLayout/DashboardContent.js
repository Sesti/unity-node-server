import React, { Component } from 'react';
import styled from 'styled-components';

const Content = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-column-gap: 2vw;
    grid-auto-flow: column;
    grid-row-gap: 2vh;
    height:90vh;
    margin:0.5%;

    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
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