import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Observable, Subject} from 'rxjs/Rx';

import * as io from 'socket.io-client';

const localhost = '192.168.0.42';

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
				public _id: string
	){}
}

@Injectable()
export class LoginService {
	private baseUrl = 'http://'+localhost+':3005/data/users/';
	private gameUrl = 'http://'+localhost+':3005/data/games/';
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
				if(!jsonUser.games)
					jsonUser.games = [];
		      return new UserModal(jsonUser.username, jsonUser.password, jsonUser.games, jsonUser._id)});
		  });

		prmLogin.catch(err => {
		  console.log('loginService::query - Problem talking to server', err);
		});

		return prmLogin;
	}

	// get (GETs a single)
	get(id:string):Promise<UserModal> {
		let prmUser = this.http.get(this.baseUrl + id)
			.toPromise()
			.then(res => {
				const jsonUser = res.json();
				if(!jsonUser.games)
					jsonUser.games = [];
				return new UserModal(jsonUser.username, jsonUser.password, jsonUser.games, jsonUser._id);
			});
		prmUser.catch(err => {
			console.log('loginService::get - Problem talking to server');
		});
		return prmUser;
	}

	// get (GETs a single)
	getGame(id:string):Promise<GameModal> {
		let prmUser = this.http.get(this.gameUrl + id)
			.toPromise()
			.then(res => {
				const jsonGame = res.json();
				return new GameModal(jsonGame.name, jsonGame.admins, jsonGame._id);
			});
		prmUser.catch(err => {
			console.log('loginService::get - Problem talking to server');
		});
		return prmUser;
	}

	//POST (add) a new username or update (PUT)
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
			  if(!jsonUser.games)
				  jsonUser.games = [];
			  return new UserModal(jsonUser.username, jsonUser.password, [], jsonUser._id);
	      });

	    prmLogin.catch(err => {
	      console.log('loginService::save - Problem talking to server', err);
	    });
	    return prmLogin;
	}

	storeUsername(user){
		console.log('username: service', user);
    	localStorage.setItem('DNDUsername', user.username);
		localStorage.setItem('DNDUserId', user._id)
  	}
	storeCurrGame(currGameId, gameName){
		console.log('storeCurrGame:gameName', gameName);
    	localStorage.setItem('currDNDgameId', currGameId);
    	localStorage.setItem('currDNDgame', gameName);
		this.addGameToUser(currGameId, this.getId());
  	}
  	logout(){
    	localStorage.removeItem('DNDUsername');
		localStorage.removeItem('DNDUserId');
  	}
	getUsername(){
		return localStorage.getItem('DNDUsername');
	}
	getId(){
		return localStorage.getItem('DNDUserId');
	}

	gamesQuery(): Promise<any[]> {

		let prmGames = this.http.get(this.gameUrl)
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

		const url = 'http://'+localhost+':3005/data/games/';
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

	addGameToUser(gameId, userId: string){
		console.log('addGameToUser:game', gameId);
		this.get(userId).then(user => {
			console.log('addGameToUser:user', user);
			user.games.push(gameId);
			this.save(user, user._id);
		});

		// this.query().then(users => {
		// 	let userObj = users.filter((friend: UserModal)=>{return friend.username === user})[0];
		// 	this.gamesQuery().then(games => {
		// 		console.log('gamess', games);
		// 		let id = games.filter((gamly => {return gamly.name === game}))[0]._id;
		// 		console.log('idd', id);
		// 		userObj.games.push(id);
		// 		this.save(userObj, userObj._id);
		// 	})
		// });
	}

}
//