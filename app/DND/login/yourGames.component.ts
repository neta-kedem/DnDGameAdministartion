import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModal } from './login.service';
import { FilterByPipe } from '../../shared/pipes/filter-games.pipe';
import { LoginService } from './login.service';
// import { FormGroup, FormBuilder, Validators, REACTIVE_FORM_DIRECTIVES, FormControl} from '@angular/forms';
import { GamesFilterComponent } from './games-filter.component';

@Component({
    moduleId: module.id,
    // selector: 'loginPage',
    templateUrl:'yourGames.component.html',
    // providers:[LoginService],
    directives: [GamesFilterComponent],
    pipes: [FilterByPipe]

})

export class yourGamesComponent implements OnInit {
    public user = {username:'', password:''};
    public user: any;
    public games: any[] = [{'name':'not yet loaded'}];
    public currShownGames: any[];
    public currGame:string;
    private filter: {};

    constructor(private router: Router,
                private loginService:LoginService) { }

    ngOnInit() {
        console.log('games:',this.games[0]);
        this.loginService.get(this.loginService.getId()).then(user => this.user = user);

        this.loginService.gamesQuery().then((games)=>{
            this.games = games;
            this.currShownGames = games;
            console.log('this.games:',this.games);
        });
    }

    existingGame(gameId){
        console.log('game1', gameId);
        console.log('games1', this.games);
        let gameName = this.games.filter(game => {return gameId === game._id})[0].name;
        console.log('name1', gameName);
        this.loginService.storeCurrGame(gameId, gameName);
        this.router.navigate(['/character']);
    }

    newGame(name){
        this.loginService.saveGames(name, this.loginService.getUsername());
        let gameName = this.games.filter(game=>name === game)[0];
        this.loginService.storeCurrGame(name, gameName);
        this.router.navigate(['/character']);
    }

    // otherGame(){
    //     this.router.navigate(['/otherGames']);
    // }
    yourGames(){
        this.currShownGames = this.user.games;
    }

    otherGames(){
        this.currShownGames = this.games;
    }

}
