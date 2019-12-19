import React, { Component } from 'react';
import ModuleElement from '../../ModulesComponents/ModuleElement';
import ModuleTitle from '../../ModulesComponents/ModuleTitle';
import styled from 'styled-components'

const StyledModuleElement = styled(ModuleElement)`
	background: #11998e;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to bottom, #38ef7d, #11998e);  /* Chrome 10-25, Safari 5.1-6 */
	background: linear-gradient(to bottom, #38ef7d, #11998e); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */	
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
		
		this.activatePurifier = this.activatePurifier.bind(this);
		this.deactivatePurifier = this.deactivatePurifier.bind(this);
	}
	
	activatePurifier( e ){
		e.preventDefault();
		console.log( '[Purifier] Activated' );
		this.call("chambre","on");
	}
	
	deactivatePurifier( e ) {
		e.preventDefault();
		console.log('[Purifier] Deactivated');
		this.call("chambre", "off");
	}
	
	call(name, mode){
		fetch( this.props.url + "/api/domotique/purifier/"+name+"/"+mode, {method: 'post'} )
	}
	
	render(){
		return (
			<StyledModuleElement size="1_4">
                <ModuleTitle color="#FFF" name="WeMo Purifier"/>
                <ModuleBody>
                    <Button onClick={this.activatePlug}>On</Button>
                    <Button onClick={this.deactivatePlug}>Off</Button>
                </ModuleBody>
            </StyledModuleElement>
		);
	}
}

export default PurifierModule;