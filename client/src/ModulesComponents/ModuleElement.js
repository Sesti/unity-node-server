import React from 'react';
import styled from 'styled-components';

const StyledModuleElement = styled.article`
    overflow: hidden;
    border-radius: 15px;
    position: relative;
    margin: 0.5%;
    height: 30%;
    box-shadow: 1px 1px 1px 1px rgba(0,0,0,0.0);
    transition: 0.3s all ease-in-out;
    background: #FFF;
    padding:1%;
    overflow:hidden;
    ${props => props.size === "1_4" ? "flex:0 1 24%;" : ""}
    ${props => props.size === "1_3" ? "flex:0 1 32%;" : ""}
    ${props => props.size === "1_2" ? "flex:0 1 49%;" : ""}
    ${props => props.size === "1_1" ? "flex:0 1 100%;" : ""}
`;

const ModuleElement = ({ children, ...other}) => <StyledModuleElement {...other}>{children}</StyledModuleElement>

export default ModuleElement;