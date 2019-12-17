import React, { Component } from 'react';
import "./PurifierModule.css";

class PurifierModule extends Component {
	
	constructor(props){
		super( props );
		
		console.log(props.name);
		
		this.activatePurifier = this.activatePurifier.bind(this);
		this.deactivatePurifier = this.deactivatePurifier.bind(this);
	}
	
	activatePurifier( e ){
		e.preventDefault();
		console.log( 'Activate plz' );
		this.call("chambre","on");
	}
	
	deactivatePurifier( e ) {
		e.preventDefault();
		console.log('deactivate plz');
		this.call("chambre", "off");
	}
	
	call(name, mode){
		fetch( "http://localhost:3005/api/domotique/purifier/"+name+"/"+mode, {method: 'post'} )
	}
	
	componentDidMount(){
	}
	
	componentWillUnmount(){
	}
	
	render(){
		return (
			<div className="App-widget module purifier_mod">
				<button onClick={this.activatePurifier} className="on">On</button>
				<button onClick={this.deactivatePurifier} className="off">Off</button>
			</div>
		);
	}
}

export default PurifierModule;
