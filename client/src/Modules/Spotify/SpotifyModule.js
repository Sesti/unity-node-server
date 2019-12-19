import React, { Component } from 'react';
import Element from '../../ModulesComponents/ModuleElement';
import ModuleTitle from '../../ModulesComponents/ModuleTitle';
import styled from 'styled-components';

const ModuleElement = styled(Element)`
    background: #000000;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to bottom, #434343, #000000);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to bottom, #434343, #000000); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    display:flex;
    flex-direction:column;
`;

const StyledBody = styled.div`
    display:flex;
    width:100%;
    align-items:center;
    margin-top:7px;
    justify-content:center;
    flex: 0 1 calc(100% - 25px);
`;
const ModuleBody = ({ children, ...other }) => <StyledBody {...other}>{children}</StyledBody>;

const Text = styled.p`
    color:#FFF;
    font-family:'Lato', sans-serif;
    font-size:20px;
`;

const Button = styled.a`
    appearance:none;
    background:#FFF;
    color:#333;
    font-weight:900;
    font-family:'Lato', sans-serif;
    border:none;
    font-size:15px;
    padding:10px 20px;
    text-decoration:none;
    outline:none;
`;

export default class SpotifyModule extends Component{

    constructor(props){
        super( props );
		this.state = { 
            isOpened: false,
            isLoaded: false,
            authState: '',
            data: null
        }
    }

    render(){

        if(!this.state.isLoaded){
            return(
                <ModuleElement size='1_2'>
                    <ModuleTitle name="Spotify" flex="column" />
                    <ModuleBody>
                        <Button href={this.props.url + "/login"}>Log in to Spotify</Button>
                    </ModuleBody>
                </ModuleElement>
            );
        }
    }
}