import React, { Component } from 'react';
import WidgetTitle from '../WidgetTitle.js';
import WeatherIcon from 'react-icons-weather';
import "./WeatherModule.css";

class WeatherModule extends Component {
	
	constructor(props){
		super( props );
		this.state = {
            isOpened: false,
			data: {
				temperature : 0,
				temperatureMin : "",
                temperatureMax : "",
                humidity : "",
                sunrise : "",
                sunset : "",
				weatherId : "",
                weatherIcon : "",
                weatherDescription : "",
                weatherMain : "",
                windDegrees : "",
                windSpeed : "",
				city : "",
			}
        }
        
        this.closeWidget = this.closeWidget.bind(this);
        this.openWidget = this.openWidget.bind(this);
	}
	
	fetchData(){
		const context = this;
		fetch( "http://localhost:3005/api/v1/weather", {method: 'get'} )
			.then( function ( response ){
				return response.json();
			} )
			.then( function ( json ){
                let obj = {
                    temperature : json.main.temp,
                    temperatureMin : json.main.temp_min,
                    temperatureMax : json.main.temp_max,
                    humidity : json.main.humidity,
                    sunrise : json.sys.sunrise,
                    sunset : json.sys.sunset,
                    weatherId : json.weather[0].id,
                    weatherIcon : json.weather[0].icon,
                    weatherDescription : json.weather[0].description,
                    weatherMain : json.weather[0].main,
                    windDegrees : json.wind.deg,
                    windSpeed : json.wind.speed,
                    city : json.name,
                }

				context.setState( {data: obj} );
			} );
	}
	
	tick(){
		this.fetchData();
	}
	
	componentDidMount(){
		this.fetchData();
		this.timerID = setInterval(
			() => this.tick(),
			60000
		);
	}
	
	componentWillUnmount(){
		clearInterval(this.timerID);
    }
    
    formatDate(timestamp){
        const date = new Date(timestamp);
        
        return date.getHours() + ":" + date.getMinutes();
    }

    openWidget(){
        this.setState({ isOpened: true });
    }


    closeWidget(){
        this.setState({ isOpened: false });
    }
	
	render(){
        const {temperature, temperatureMin, temperatureMax, humidity, sunrise, sunset, weatherId, weatherIcon, 
            weatherDescription, weatherMain, windDegrees, windSpeed, city } = this.state.data;
        const iconId = weatherId === "" ? "200" : weatherId.toString();
        
        if(this.state.isOpened){
            return(
                <div className="App-widget Opened" onClick={this.closeWidget}>
                    <WidgetTitle name="Meteo"/>
                    <WeatherIcon name="owm" className="weather-icon" iconId="200"/>
                    <div>{Math.round(temperatureMin)}&#176;</div>
                    <div>{Math.round(temperature)}&#176;</div>
                    <div>{Math.round(temperatureMax)}&#176;</div>
                    <div>{humidity}</div>
                    <div>{this.formatDate(sunrise)}</div>
                    <div>{this.formatDate(sunset)}</div>
                    <div>{weatherDescription}</div>
                    <div>{weatherMain}</div>
                    <div>{windDegrees}</div>
                    <div>{windSpeed}</div>
                    <div>{city}</div>
                </div>         
            );
        }else{
            return (
                <div className="App-widget App-widget-1-4 widget-meteo" onClick={this.openWidget}>
                    <WidgetTitle name="Meteo"/>
                    <WeatherIcon name="owm" className="weather-icon" iconId={iconId}/>
                    <div className="widget-content widget-column">
                        <p>{weatherMain}</p>
                        <p>{Math.round(temperature)}&#176;</p>
                    </div>
                    <span className="widget-bottom-right text-gray">{city}</span>
                </div>
            );
        }
	}
}

export default WeatherModule;