import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
	// private f: FormGroup;


	constructor(private router: Router,
	private loginService:LoginService,
	private route: ActivatedRoute
	) { }

	ngOnInit() {
      	// this.loginService.logout();

		this.loginService.query().then((users)=>{
			this.users = users;
			console.log('users:',this.users)
		});	
	 }

	public save(username, password) {
		console.log(username, password);
		if(this.users.some((user)=>{return ((user.username === username)&&(user.password === password))})){
			this.loginService.storeUsername(username);
			this.router.navigate(['/character']);	
		} else {
			alert('wrong username or password')
		}


		// this.loginService.userLogin({username:username, password:password});

		
	//	if (this.users.indexOf(formValue.username) === -1){
	//		this.users.push(formValue.username);
	//		console.log('users:',this.users);
	//	}
	//	this.router.navigate(['/monster']);

		// this.loginService.get(formValue.username)
  //           .then((character) => {
  //               this.monsterToEdit = character;
  //               console.log('in edit, ajax returned : ', this.monsterToEdit, this.frmMonster.controls);
  //               (<FormControl>this.frmMonster.controls['name']).updateValue(character.name);
  //               (<FormControl>this.frmMonster.controls['level']).updateValue(character.level);
  //           });
	
	}
	signUp(username, password){
		if(this.users.some((user)=>{return user.username === username})){
			alert('username already exist');	
		}
		else{
			this.loginService.save({username:username, password:password});
			this.loginService.storeUsername(username);
			this.router.navigate(['/character/edit']);
		}
	}
	
}