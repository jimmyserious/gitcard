import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const API = 'https://api.github.com/users/';

class App extends Component {

	constructor(props){
		super(props);
		console.log(this.props); // prints out whatever is inside props
		this.state = {"username":"jimmyserious"};
	}

	_fetchProfile( username ){
		return fetch(API + username)
			.then((response) => response.json())
			.then((responseJson) => {
				console.log(responseJson);
				this.setState({"avatarurl":responseJson.avatar_url,
					repos: responseJson.public_repos,
					followers: responseJson.followers,
					following: responseJson.following,})
			})
			.catch((error) =>{
				console.error(error);
			});
	}

	componentDidMount() {
		this._fetchProfile(this.state.username);
	}

	render() {
    return (
      <div className="gitcard">
        <div className="gitcard-header">
            <div className="wrapper">
	            <img src={this.state.avatarurl} className="avatarimg" alt={this.state.username} />
            </div>
          <h1 className="App-title">{this.state.username}</h1>
        </div>
        <div className="gitcard-body">
	        <ul>
		        <li><span>repos</span>{this.state.repos}</li>
		        <li><span>followers</span>{this.state.followers}</li>
		        <li><span>following</span> {this.state.following}</li>
	        </ul>
        </div>
      </div>
    );
  }
}

export default App;
