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

const Error = styled(Text)`
    color:red;
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

        let params = this.getHashParams();
        let isAuthorized = params.authorized ? true : false;

		this.state = { 
            isOpened: false,
            isLoaded: false,
            isAuthorized: isAuthorized,
            authState: '',
            access_token: '',
            refresh_token: '',
            error: '',
            data: null
        }

        this.actionNext = this.actionNext.bind(this);
        this.actionPrev = this.actionPrev.bind(this);
        // this.actionPlay = this.actionPlay.bind(this);
        // this.actionPause = this.actionPause.bind(this);
    }

    actionNext(e){
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.state.access_token);
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');

        const init = {
            headers: headers,
            mode: 'cors',
            method: 'POST'
        }

        let data = {};

        fetch('https://api.spotify.com/v1/me/player/next', init)
            .then(res => {
                console.log(res);
                console.log(this);
                if (res.status === 200) {
                    return res.json();
                }else if(res.status === 204) {
                    return;
                }
            })
            .then(res => console.log(res));
    }

    actionPrev(e){
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.state.access_token);
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');

        const init = {
            headers: headers,
            mode: 'cors',
            method: 'POST'
        }

        let data = {};

        fetch('https://api.spotify.com/v1/me/player/previous', init)
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    return res.json()
                }else if(res.status === 204) {
                    return;
                }
            })
            .then(res => console.log(res));
    }

    getHashParams() {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        while ( e = r.exec(q)) {
           hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        return hashParams;
    }

    fetchState(){
        if(this.state.isAuthorized){
            let params = this.getHashParams();
            let access_token = params.access_token,
                refresh_token = params.refresh_token,
                error = params.error;

            if(access_token) this.setState( {access_token: access_token} );
            if(refresh_token) this.setState( {refresh_token: refresh_token} );
            if(error) this.setState( {error: error} );

            let headers = new Headers();
            headers.append('Authorization', 'Bearer ' + access_token);
            headers.append('Accept', 'application/json');
            headers.append('Content-Type', 'application/json');

            const init = {
                headers: headers,
                mode: 'cors'
            }

            let data = {};

            fetch('https://api.spotify.com/v1/me/player/currently-playing', init)
                .then(res => {
                    let data = {};

                    if (res.status === 200) {
                        return res.json()
                    } else if (res.status === 204) {
                        data.currentlyPlaying = false;
                        return;
                    } else if (res.status === 401) {
                        this.setState( {access_token: "", refresh_token: ""} );
                        return;
                    }
                })
                .then(res => {

                    console.log(res);
                    data.currentlyPlaying = true;
                    data.albumImage = res.item.album.images;
                    data.artists = res.item.artists.map(a => a.name);
                    data.progress = res.progress_ms;
                    data.duration = res.item.duration_ms;
                    data.name = res.item.name;
                    data.popularity = res.item.popularity;
                    this.setState( {data : data} );
                })
                .catch(err => console.log(err));
        }
    }

    componentDidMount(){
        this.fetchState();
        this.timer = setInterval(() => {this.fetchState()}, 3000);
    }

    componentWillUnmount(){
        clearInterval(this.timer);
    }

    stringToCssClass(string){
        return encodeURIComponent(
            string.toLowerCase()
        ).replace(/%[0-9A-F]{2}/gi,'');
      }

    render(){
        
        if(!this.state.isAuthorized){            
            return (
                <ModuleElement size='1_2'>
                    <ModuleTitle name="Spotify" flex="column" />
                    <ModuleBody>
                        <Button href={this.props.url + "/login"}>Log in to Spotify</Button>
                    </ModuleBody>
                </ModuleElement>
            );
            
        }else if(this.state.error){
            return(
                <ModuleElement size='1_2'>
                    <ModuleTitle name="Spotify" flex="column" />
                    <ModuleBody>
                        <Error>There was an error during authentication</Error>
                    </ModuleBody>
                </ModuleElement>
            );
        }else{
            
            if(this.state.data != null){
                const {albumImage, name, artists} = this.state.data;

                const artistsDOM = artists.map(a => 
                    <li key={this.stringToCssClass(a)}>{a}</li>
                );

                return(
                    <ModuleElement size='1_2'>
                        <ModuleTitle name="Spotify" flex="column" />
                        <ModuleBody>
                            <Text>{this.state.data.currentlyPlaying ? "Playing" : "Paused"}</Text>
                            <img width="100px" height="100px" src={albumImage[1].url} />
                            <Text>{name}</Text>
                            <ul>{artistsDOM}</ul>
                            <Button onClick={this.actionPrev}>Prev</Button>
                            <Button onClick={this.actionNext}>Next</Button>
                        </ModuleBody>
                    </ModuleElement>
                );
            }else{
                return(
                    <ModuleElement size='1_2'>
                        <ModuleTitle name="Spotify" flex="column" />
                        <ModuleBody>                            
                            <Text>Not currently playing</Text>
                        </ModuleBody>
                    </ModuleElement>
                );
            }
        }
    }
}