import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModal } from './login.service';
import { LoginService } from './login.service';
// import { FormGroup, FormBuilder, Validators, REACTIVE_FORM_DIRECTIVES, FormControl} from '@angular/forms';

@Component({
    moduleId: module.id,
    // selector: 'loginPage',
    template:`
                <div *ngIf="games.length">
                    <label>Games:</label><br>
                    <div *ngFor="let game of games">
                        <input type="radio" name="buildTool" value={{game.name}} [(ngModel)]="currGame">{{game.name}}</div>
                    <br>
                    <input [disabled]="(!currGame)" type="button" class="btn btn-default" value="Enter" (click)="existingGame(currGame)">
                </div>
            `,
    // providers:[LoginService],
    // directives: [REACTIVE_FORM_DIRECTIVES, UploadDemoComponent]

})

export class otherGamesComponent implements OnInit {
    public user = {username:'', password:''};
    public users: any[];
    public games: any[] = [{'name':'not yet loaded'}];

    constructor(private router: Router,
                private loginService:LoginService) { }

    ngOnInit() {
        this.loginService.query().then((users)=>{
            this.users = users;
            console.log('users:',this.users)
        });

        this.loginService.gamesQuery().then((games)=>{
            this.games = games;
            console.log('this.games:',this.games);
        });
    }

    // public save(username, password, currGame) {
    //     console.log(username, password, currGame);
    //     if(this.users.some((user)=>{return ((user.username === username)&&(user.password === password))})){
    //         this.loginService.storeCurrGame(currGame);
    //         this.router.navigate(['/character']);
    //     } else {
    //         alert('wrong username or password')
    //     }
    // }

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
        console.log('not yet');
    }

}
/**
 * Created by neta on 9/11/16.
 */
