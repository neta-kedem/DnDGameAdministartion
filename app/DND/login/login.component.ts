import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModal } from './login.service';
import { LoginService } from './login.service';
// import { FormGroup, FormBuilder, Validators, REACTIVE_FORM_DIRECTIVES, FormControl} from '@angular/forms';
// import {UploadDemoComponent} from '../shared/upload-demo/upload-demo.component'


@Component({
	moduleId: module.id,
	// selector: 'loginPage',
	templateUrl:'login.component.html',
	// providers:[LoginService],
	// directives: [REACTIVE_FORM_DIRECTIVES, UploadDemoComponent]

})

export class loginPageComponent implements OnInit {
	public user = {username:'', password:''};
	public users: any[];
	public games: any[] = [{'name':'not yet loaded'}];
	public currGame:string;
	constructor(private router: Router,
				private loginService:LoginService) { }

	ngOnInit() {
		console.log('games:',this.games[0]);
		this.loginService.query().then((users)=>{
			this.users = users;
			console.log('users:',this.users)
		});

		// this.loginService.gamesQuery().then((games)=>{
		// 	this.games = games;
		// 	console.log('this.games:',this.games);
		// });
	 }

	public save(username, password) {
		console.log(username, password);
		if(this.users.some((user)=>{return ((user.username === username)&&(user.password === password))})){
			this.loginService.storeUsername(username);
			// this.loginService.storeCurrGame(currGame);
			this.router.navigate(['/yourGames']);
		} else {
			alert('wrong username or password')
		}
	}

	signUp(username, password){
		if(this.users.some((user)=>{return user.username === username})){
			alert('username already exist');	
		}
		else{
			this.loginService.save({username:username, password:password});
			this.loginService.storeUsername(username);
			// this.loginService.storeCurrGame(currGame);
			this.router.navigate(['/yourGames']);
		}
	}

	// newGame(name){
	// 	this.loginService.saveGames(name);
     //    this.router.navigate(['/character']);
	// }
	
}