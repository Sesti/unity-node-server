import React, { Component } from "react";
import "./WidgetTitle.css";

export default class WidgetTitle extends Component{

    constructor(props){
        super(props);

    }

    render(){
        return(
            <h2 className="widget-title">{this.props.name}</h2>
        );
    };
}