import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Observable, Subject} from 'rxjs/Rx';

import * as io from 'socket.io-client';


export class UserModal {
	
	constructor(public username: string,
				public password: string,
				public games: {}[],
				public _id: string
	){}
}
export class GameModal {
	
	constructor(public name: string,
				public admins: string[],
				public _id: string,
	){}
}

@Injectable()
export class LoginService {
	private baseUrl = 'http://localhost:3005/data/users/';
	constructor(private http: Http) {}


	public get url() {
	  return this.baseUrl;
	}

	// query (GETs a list)
	query(): Promise<UserModal[]> {

		let prmLogin = this.http.get(this.baseUrl)
		  .toPromise()
		  .then(res => {
		    const jsonUsers = res.json();
		    // console.log('users', jsonUser)
		    return jsonUsers.map((jsonUser : any) => {
		    	// console.log('text:',jsonKid.username, jsonKid.password);
		      // let jsonKidContacts = JSON.parse(jsonKid.contacts);
		      return new UserModal(jsonUser.username, jsonUser.password, jsonUser.games, jsonUser._id)});
		  });

		prmLogin.catch(err => {
		  console.log('loginService::query - Problem talking to server', err);
		});

		return prmLogin;
	}

	//POST (add) a new username or EDIT
	save(user: any, id?:string) : Promise<UserModal>{
		delete user._id;
	    let response : any;
	    let prmLogin : Promise<UserModal>;

		if (id) {
			const url = this.baseUrl + id;
			response = this.http.put(url, user);

		} else {
			const url = this.baseUrl;
			response = this.http.post(url, user);
		}

	    prmLogin = response.toPromise()
	      .then((res : any) => {
	          const jsonUser = res.json();
			      return new UserModal(jsonUser.username, jsonUser.password, [], jsonUser._id);
	      });

	    prmLogin.catch(err => {
	      console.log('loginService::save - Problem talking to server', err);
	    });
	    return prmLogin;
	}

	storeUsername(username){
    	localStorage.setItem('DNDUsername', username);
  	}
	storeCurrGame(currGame){
    	localStorage.setItem('currDNDgame', currGame);
		this.addGameToUser(currGame, this.getUsername());
  	}
  	logout(){
    	localStorage.removeItem('DNDUsername');
  	}
	getUsername(){
		return localStorage.getItem('DNDUsername');
	}

	gamesQuery(): Promise<any[]> {

		let prmGames = this.http.get('http://localhost:3005/data/games/')
		  .toPromise()
		  .then(res => {
		    const jsonGames = res.json();
		    return jsonGames;
		});

		prmGames.catch(err => {
		  console.log('loginService::query - Problem talking to server', err);
		});

		return prmGames;
	}

	//POST (add) a new game
	saveGames(game: string, user: string){

		let response: any;
		let prmGamesName;
		this.addGameToUser(game, user);

		const url = 'http://localhost:3005/data/games/';
		response = this.http.post(url, {name:game,
		admins:[user]});

		prmGamesName = response.toPromise()
			.then((res : any) => {
				const jsonGame = res.json();
				return jsonGame.name;
			});

		prmGamesName.catch(err => {
			console.log('loginService::saveGames - Problem talking to server', err);
		});
		return prmGamesName;
	}

	addGameToUser(game: string, user: string){
		this.query().then(users => {
			let userObj = users.filter((friend: UserModal)=>{return friend.username === user})[0]
			this.gamesQuery().then(games => {
				console.log('gamess', games);
				let id = games.filter((gamly => {return gamly.name === game}))[0]._id;
				console.log('idd', id);
				userObj.games.push(id);
				this.save(userObj, userObj._id);
			})
		});
	}

}
//