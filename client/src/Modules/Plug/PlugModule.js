import React, { Component } from 'react';
import ModuleElement from '../../ModulesComponents/ModuleElement';
import ModuleTitle from '../../ModulesComponents/ModuleTitle';
import styled from 'styled-components';

const StyledModuleElement = styled(ModuleElement)`
    background: #fe8c00;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to top, #f83600, #fe8c00);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to top, #f83600, #fe8c00); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    display:block;
`;

const StyledBody = styled.div`
    display:flex;
    width:100%;
    justify-content:center;
    align-items:center;
    margin-top:7px;
`;
const ModuleBody = ({ children, ...other }) => <StyledBody {...other}>{children}</StyledBody>;

const Button = styled.button`
    border: 4px solid #FFF;
    padding: 11px 20px;
    color: #FFF;
    font-family: "Lato",sans-serif;
    background: transparent;
    border-radius: 10px;
    margin: 25px 10px;
    font-weight: 900;
    font-size: 19px;
    cursor: pointer;
    -webkit-transition: 0.3s all ease;
    transition: 0.3s all ease;
`;

class PurifierModule extends Component {
	
	constructor(props){
		super( props );
		
		this.activatePlug = this.activatePlug.bind(this);
		this.deactivatePlug = this.deactivatePlug.bind(this);
	}
	
	activatePlug( e ){
		e.preventDefault();
		console.log( '[Plug] Activated' );
		this.call("bathroom","on");
	}
	
	deactivatePlug( e ) {
		e.preventDefault();
		console.log('[Plug] Deactivated');
		this.call("bathroom", "off");
	}
	
	call(name, mode){
		fetch( this.props.url + "/api/v1/domotique/plug/"+name+"/"+mode, {method: 'get'} )
	}
	
	render(){
		return (
            <StyledModuleElement size="1_4">
                <ModuleTitle color="#FFF" name="SmartLife Plug"/>
                <ModuleBody>
                    <Button onClick={this.activatePlug} className="on">On</Button>
                    <Button onClick={this.deactivatePlug} className="off">Off</Button>
                </ModuleBody>
            </StyledModuleElement>
		);
	}
}

export default PurifierModule;