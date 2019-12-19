import React from 'react';
import WeatherIcons from 'react-icons-weather';
import styled from 'styled-components'

const StyledWeatherIcon = styled.div`
    & > i{
        background: #FFEFBA;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to top, #FFFFFF, #FFEFBA);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to top, #FFFFFF, #FFEFBA); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  
        -webkit-background-clip: text;
        background-clip:text;
        -webkit-text-fill-color: transparent;
        font-size: 60px;
        line-height: 1.7em;
    }
`;
const WeatherIcon = ({ children, ...other}) => <StyledWeatherIcon><WeatherIcons {...other} /></StyledWeatherIcon>

export default WeatherIcon