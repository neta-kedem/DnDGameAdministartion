import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModal } from './login.service';
import { LoginService } from './login.service';
// import { FormGroup, FormBuilder, Validators, REACTIVE_FORM_DIRECTIVES, FormControl} from '@angular/forms';


@Component({
    moduleId: module.id,
    // selector: 'loginPage',
    templateUrl:'yourGames.component.html',
    // providers:[LoginService],
    // directives: [REACTIVE_FORM_DIRECTIVES, UploadDemoComponent]

})

export class yourGamesComponent implements OnInit {
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

        this.loginService.gamesQuery().then((games)=>{
            this.games = games;
            console.log('this.games:',this.games);
        });
    }

    existingGame(game){
        console.log('game', game);
        this.loginService.storeCurrGame(game);
        this.router.navigate(['/character']);
    }

    newGame(name){
        this.loginService.saveGames(name, this.loginService.getUsername());
        this.loginService.storeCurrGame(name);
        this.router.navigate(['/character']);
    }

    otherGame(){
        this.router.navigate(['/otherGames']);
    }

}
