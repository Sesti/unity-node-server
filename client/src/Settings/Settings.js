import React, { Component } from 'react';
import Cogwheel from '../Svg/Cogwheel';
import styled from 'styled-components';


const StyledCogwheel = styled(Cogwheel)`
    cursor:pointer;
`

export default class Settings extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return (
            <StyledCogwheel />
        );
    }
    
}