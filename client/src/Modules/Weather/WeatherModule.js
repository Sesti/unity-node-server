import React, { Component } from 'react';
import ModuleTitle from '../../ModulesComponents/ModuleTitle';
import ModuleElement from '../../ModulesComponents/ModuleElement';
import Body from '../../ModulesComponents/ModuleBody';
import ModuleLoading from '../../ModulesComponents/ModuleLoading';
import ModuleFadeFooter from '../../ModulesComponents/ModuleFadeFooter';
import WeatherIcon from './WeatherIcon';
import styled from 'styled-components';

const StyledModuleElement = styled(ModuleElement)`
    background: #2193b0;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to bottom, #6dd5ed, #2193b0);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to bottom, #6dd5ed, #2193b0); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    display:block;
`;

const Weather = styled.p`
    margin:0;
    color:#FFF;
    font-family: 'Lato', sans-serif;
    font-weight:bold;
    font-size:20px;
`;

const Temperature = styled(Weather)`
    font-size:35px;
`;

const StyledWidgetContent = styled.div`
    display:flex;
    justify-content: center;
    align-items: flex-start;
`;
const WidgetContent = ({ children, ...other }) => <StyledWidgetContent {...other}>{children}</StyledWidgetContent>;

const StyledBody = styled.div`
    display:flex;
    width:100%;
    justify-content:space-around;
    align-items:center;
    margin-top:7px;
`;
const ModuleBody = ({ children, ...other }) => <StyledBody {...other}>{children}</StyledBody>;

class WeatherModule extends Component {
	
	constructor(props){
		super( props );
		this.state = { 
            isOpened: false, 
            isLoaded: false,
            data: null
        }
        
        this.closeWidget = this.closeWidget.bind(this);
        this.openWidget = this.openWidget.bind(this);
	}
	
	fetchData(){
        const context = this;
		fetch( this.props.url + "/api/v1/weather", {method: 'get'} )
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
                context.setState( {
                    isLoaded: true,
                    data: obj
                } );
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
       
        if(this.state.isLoaded){

            const {temperature, temperatureMin, temperatureMax, humidity, sunrise, sunset, weatherId, weatherIcon, 
                    weatherDescription, weatherMain, windDegrees, windSpeed, city } = this.state.data;
            const iconId = weatherId === "" ? "200" : weatherId.toString();

            return (
                <StyledModuleElement size="1_4">
                    <ModuleTitle color="#FFF" name="Meteo"/>
                    <ModuleBody>
                        <WeatherIcon name="owm" className="weather-icon" iconId={iconId}/>
                        <WidgetContent className="widget-content widget-column">
                            <Temperature>{Math.round(temperature)}&#176;</Temperature>
                            <Weather>{weatherMain}</Weather>
                        </WidgetContent>
                        <ModuleFadeFooter className="widget-bottom-right text-gray">{city}</ModuleFadeFooter>
                    </ModuleBody>
                </StyledModuleElement>
            );
        }else{
            return (
                <ModuleLoading text="Fetching weather..." />
            );
        }
        /*
        if(!this.state.isOpened){
        }else{
            
            return(
                <div className="App-widget Opened" onClick={this.closeWidget}>
                    <ModuleTitle color="#FFF" name="Meteo"/>
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
        }
        */
	}
}

export default WeatherModule;