import React, { Component } from 'react';
import ModuleTitle from '../../ModulesComponents/ModuleTitle';
import "./PurifierModule.css";

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
		fetch( "http://localhost:3000/api/domotique/purifier/"+name+"/"+mode, {method: 'post'} )
	}
	
	render(){
		return (
			<div className="App-widget App-widget-1-4 module purifier_mod">
				<ModuleTitle color="#FFF" name="WeMo Purifier"/>
				<button onClick={this.activatePurifier} className="on">On</button>
				<button onClick={this.deactivatePurifier} className="off">Off</button>
			</div>
		);
	}
}

export default PurifierModule;