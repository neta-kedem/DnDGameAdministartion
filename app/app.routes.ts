import { PLATFORM_DIRECTIVES } from '@angular/core';
import { RouterConfig, ROUTER_DIRECTIVES, provideRouter } from '@angular/router';
import {AppComponent} from './app.component';
import {CharacterComponent} from './DND/charactersPage/character.component';
import {CharacterEditComponent} from './DND/charactersPage/character-edit.component';
// import {ChatRoomComponent} from './chat/chat-room.component';
import {adminComponent} from './DND/admin/admin.component';
import {yourGamesComponent} from './DND/login/yourGames.component';
import {loginPageComponent} from './DND/login/login.component';
import {CharacterListComponent} from './DND/charactersPage/characters-list.component';
import {otherGamesComponent} from './DND/login/otherGame.component';

const routes: RouterConfig = [
  { path: '', component: loginPageComponent },
  { path: '*', component: CharacterListComponent },
  { path: 'character/edit', component: CharacterEditComponent },
  { path: 'character/edit/:id', component: CharacterEditComponent },
  { path: 'character/:id', component: CharacterComponent },
  // { path: 'chat', component: ChatRoomComponent },
  { path: 'login', component: loginPageComponent },
  { path: 'character', component: CharacterListComponent },
  { path: 'admin', component: adminComponent },
  { path: 'yourGames', component: yourGamesComponent },
  { path: 'otherGames', component: otherGamesComponent }
  // { path: 'app', component: AppComponent }
  
];

export const ROUTER_PROVIDERS = [
  provideRouter(routes),
  {provide: PLATFORM_DIRECTIVES, useValue: ROUTER_DIRECTIVES, multi: true}
];
