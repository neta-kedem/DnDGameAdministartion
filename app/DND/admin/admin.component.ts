import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from './admin.service';

@Component({
	moduleId: module.id,
	templateUrl: 'admin.component.html',
	providers:[AdminService]
})
export class adminComponent implements OnInit {
	public user = {username:''};
	public admins: any[];
	public game: string = '';
	
	constructor(private router: Router, public adminService:AdminService) { }

	ngOnInit() {
		this.adminService.query().then((users)=>{
			this.admins = users;
			console.log('admins:',this.admins);
			//todo: allow only if user is admin
			let currUser = this.adminService.getUsername();
			console.log('are you an admin',this.admins.some((admin) => {return admin.username === currUser}));
			
		});
	}

	addAdmin(username){
		if(this.admins.some((user)=>{return user.username === username})){
			alert(username+' is already an admin');	
		}
		else{
			this.adminService.save({username:username});
			// this.adminService.addAdmin(username);
			this.router.navigate(['/character']);
		}
	}

	deleteGame() {

	}
}