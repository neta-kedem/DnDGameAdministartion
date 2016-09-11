import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Observable, Subject} from 'rxjs/Rx';

import * as io from 'socket.io-client';

@Injectable()
export class CookieService {
	// private baseUrl = 'http://localhost:3003/data/';
	// constructor(private http: Http) {}
    //
    //
	// public get url() {
	//   return this.baseUrl;
	// }

	// // query (GETs a list)
	// query(): Promise<AdminModal[]> {
    //
	// 	let prmLogin = this.http.get(this.baseUrl)
	// 	  .toPromise()
	// 	  .then(res => {
	// 	    const jsonUser = res.json();
	// 	    return jsonUser.map((jsonUser : any) => {
	// 	      return new AdminModal(jsonUser.username)});
	// 	  });
    //
	// 	prmLogin.catch(err => {
	// 	  console.log('loginService::query - Problem talking to server', err);
	// 	});
    //
	// 	return prmLogin;
	// }
    //
	// save(user: any) : Promise<AdminModal>{
    //
	//     let response : any;
	//     let prmLogin : Promise<AdminModal>;
    //
	//
	//     const url = this.baseUrl;
	//    	response = this.http.post(url, user)
	//
    //
    //
	//     prmLogin = response.toPromise()
	//       .then((res : any) => {
	//           const jsonUser = res.json();
	//           console.log('user', jsonUser)
	// 		      return new AdminModal(jsonUser.username);
	//       });
    //
	//     prmLogin.catch(err => {
	//       console.log('loginService::save - Problem talking to server', err);
	//     });
	//     return prmLogin;
	// }

	addAdmin(username){
    	localStorage.setItem('DNDUsername', username);
  	}
  	
  	getUsername(){
		return localStorage.getItem('DNDUsername');
  	}

  	getGameName(){
  		return localStorage.getItem('currDNDgame');
	}
}