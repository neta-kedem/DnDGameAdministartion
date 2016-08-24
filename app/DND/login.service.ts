import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Observable, Subject} from 'rxjs/Rx';

import * as io from 'socket.io-client';


export class UserModal {
	
	constructor(public username: string,
				public password: string
				// public characters: [],
				// public id: number
	){}
}

@Injectable()
export class LoginService {
	private baseUrl = 'http://localhost:3003/data/user/';
	constructor(private http: Http) {}


	public get url() {
	  return this.baseUrl;
	}

	// query (GETs a list)
	query(): Promise<UserModal[]> {

		let prmLogin = this.http.get(this.baseUrl)
		  .toPromise()
		  .then(res => {
		    const jsonUser = res.json();
		    // console.log('users', jsonUser)
		    return jsonUser.map((jsonKid : any) => {
		    	// console.log('text:',jsonKid.username, jsonKid.password);
		      // let jsonKidContacts = JSON.parse(jsonKid.contacts);
		      return new UserModal(jsonKid.username, jsonKid.password)});
		  });

		prmLogin.catch(err => {
		  console.log('loginService::query - Problem talking to server', err);
		});

		return prmLogin;
	}

	save(user: any) : Promise<UserModal>{

	    let response : any;
	    let prmLogin : Promise<UserModal>;

	    
	    const url = this.baseUrl;
	   	response = this.http.post(url, user)
	    


	    prmLogin = response.toPromise()
	      .then((res : any) => {
	          const jsonUser = res.json();
	          console.log('user', jsonUser)
			      return new UserModal(jsonUser.username, jsonUser.password);
	      });

	    prmLogin.catch(err => {
	      console.log('loginService::save - Problem talking to server', err);
	    });
	    return prmLogin;
	}
	storeUsername(username){
    	localStorage.setItem('DNDUsername', username);
  	}

  	logout(){
    	localStorage.removeItem('DNDUsername');
  	}
	// private baseUrl = 'http://mrjson.com/data/57b18addfd12d77142988aff/user/';
	// private users : UserModal[];
	// constructor(private http: Http) {}

	// query(): Promise<UserModal[]> {

	// 	let prmUser = this.http.get(this.baseUrl + 'list.json')
	// 		.toPromise()
	// 		.then(res => {
	// 		const jsonCharacters = res.json();
	// 		return jsonCharacters.map(jsonCharacter =>
	// 			new UserModal(jsonCharacter.username, jsonCharacter.password,
	// 			 // jsonCharacter.characters,
	// 			  jsonCharacter.id))
	// 		});

	// 	prmUser.catch(err => {
	// 		console.log('Problem talking to server');
	// 	});

	// 	return prmUser;
	// }

	// url$ = Observable.of('192.168.0.42:3003');
	// private socket$ : any;
	// public connected$ : any;
	// public messages$ : any;
	
	// public send$ = new Subject();

	// constructor(@Inject('io') io){
	// 	this.socket$ = this.url$
	// 	.switchMap(url => Observable.of(io(url)));
		
	// 	this.messages$ = this.socket$
	// 		.switchMap(socket => Observable.fromEvent(socket, 'chat message'))
	// 		// .do((ev)=>console.log('Got Msg:',  ev) )
	// 		.startWith([])
	// 		.scan((acc, curr)=> [...acc, curr]);
		
	// 	const disconnect$ = this.socket$
	// 	.switchMap(socket => Observable.fromEvent(socket, 'disconnect'));
		
	// 	const connect$ = this.socket$
	// 	.switchMap(socket => Observable.fromEvent(socket, 'connect'));
		
	// 	this.connected$ = Observable.merge(
	// 	connect$.mapTo(true),
	// 	disconnect$.mapTo(false)
	// 	);
		
	// 	// this.send$.withLatestFrom(this.socket$, (message, socket: SocketIOClient.Socket)=>{
	// 	// return {message, socket};
	// 	// })
	// 	// .subscribe(({message, socket})=>{
	// 	// // console.log('Emitting msg: ', message);
	// 	// socket.emit('chat message', message);
	// 	// });
	// }
	// userLogin(user){
		
	// }

	// // get(id: number) : Promise<UserModal> {
	// // 	let prmUser = this.http.get(this.baseUrl + id + '.json')
	// // 		.toPromise()
	// // 		.then(res => {
	// // 		const jsonMonster = res.json();
	// // 		return new UserModal(jsonCharacter.username, jsonCharacter.password, jsonCharacter.characters, jsonCharacter.id);
	// // 		});

	// // 	prmUser.catch(err => {
	// // 		console.log('Problem talking to server');
	// // 	});
	// // 	return prmUser;

	// // }
	// get(userName: string) : Promise<UserModal> {
	// 	let prmUser = this.http.get(this.baseUrl + 'list.json')
	// 	.toPromise()
	// 	.then(res => {
	// 	const jsonCharacters = res.json();
	// 	return jsonCharacters.map(jsonCharacter =>
	// 		new UserModal(jsonCharacter.username, jsonCharacter.password, jsonCharacter.characters, jsonCharacter.id))
	// 	});

	// prmUser.catch(err => {
	// 	console.log('Problem talking to server');
	// });

	// prmUser.then((users: UserModal[]) => {
	// 	this.users = users;
	// 	console.log('this/users:',this/users);
	// });

	// }

	// remove(id: number) : Promise<UserModal[]> {
	// let prmUser = this.http.delete(this.baseUrl + id + '.json')
	// 	.toPromise()
	// 	.then(res => {
	// 	return this.query();

	// 	});

	// prmUser.catch(err => {
	// 	console.log('Problem talking to server', err);
	// });
	// return prmUser;
	// }

	// save(monsterData: any, id?: number) : Promise<UserModal>{

	// 	let response : any;
	// 	let prmUser : Promise<UserModal>;

	// 	if (id) {
	// 		const url = this.baseUrl + id + '.json'
	// 		response = this.http.put(url, monsterData)
	// 	} else {
	// 		const url = this.baseUrl + 'item.json';
	// 		 response = this.http.post(url, monsterData)
	// 	}

	// 	prmUser = response.toPromise()
	// 		.then(res => {
	// 			const jsonCharacter = res.json();
	// 			return new UserModal(jsonCharacter.username, jsonCharacter.password, jsonCharacter.characters, jsonCharacter.id);
	// 		});

	// 	prmUser.catch(err => {
	// 		console.log('Problem talking to server', err);
	// 	});
	// 	return prmUser;
	// }

}