import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Observable, Subject} from 'rxjs/Rx';

import * as io from 'socket.io-client';

const localhost = 'localhost';
export class AdminModal {
	
	constructor(public username: string){}
}

@Injectable()
export class AdminService {
	private baseUrl = 'http://'+localhost+':3005/data/admin/';
	constructor(private http: Http) {}


	public get url() {
	  return this.baseUrl;
	}

	// query (GETs a list)
	query(): Promise<AdminModal[]> {

		let prmLogin = this.http.get(this.baseUrl)
		  .toPromise()
		  .then(res => {
		    const jsonUser = res.json();
		    return jsonUser.map((jsonUser : any) => {
		      return new AdminModal(jsonUser.username)});
		  });

		prmLogin.catch(err => {
		  console.log('adminService::query - Problem talking to server', err);
		});

		return prmLogin;
	}

	save(user: any) : Promise<AdminModal>{

	    let response : any;
	    let prmLogin : Promise<AdminModal>;

	    const url = this.baseUrl;
	   	response = this.http.post(url, user);

	    prmLogin = response.toPromise()
	      .then((res : any) => {
	          const jsonUser:any = res.json();
	          console.log('user', jsonUser);
			      return new AdminModal(jsonUser.username);
	      });

	    prmLogin.catch(err => {
	      console.log('adminService::save - Problem talking to server', err);
	    });
	    return prmLogin;
	}

  	getUsername(){
		return localStorage.getItem('DNDUsername');
  	}
    deleteGame(gameId){
        let baseUrl = 'http://localhost:3005/data/games';
        let prmChar = this.http.delete(baseUrl + gameId)
            .toPromise()
            .then(res => {
                return this.query();
            });

        prmChar.catch(err => {
            console.log('adminService::deleteGame - Problem talking to server', err);
        });
        return prmChar;
    }
  	// //POST (add) a new game
	// saveGames(game: string){
    //
	//     let response : any;
	//     let prmGamesName;
    //
	//     const url = 'http://localhost:3003/data/games/';
	//    	response = this.http.post(url, {name:game});
    //
	//     prmGamesName = response.toPromise()
	//       .then((res : any) => {
	//           const jsonGame = res.json();
	//           console.log('game', jsonGame)
	// 		      return jsonGame.name;
	//       });
    //
	//     prmGamesName.catch(err => {
	//       console.log('adminService::saveGames - Problem talking to server', err);
	//     });
	//     return prmGamesName;
	// }
}