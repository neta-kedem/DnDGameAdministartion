import { PLATFORM_DIRECTIVES } from '@angular/core';
import {AppComponent} from './app.component';
import {CharacterComponent} from './DND/character.component';
import {CharacterEditComponent} from './DND/character-edit.component';
// import {ChatRoomComponent} from './chat/chat-room.component';
// import {EscapeTogetherComponent} from './escapeTogether/escapeTogetherComponent';
import {loginPageComponent} from './DND/login.component';
import {CharacterListComponent} from './DND/characters-list.component';
import { RouterConfig, ROUTER_DIRECTIVES, provideRouter } from '@angular/router';

const routes: RouterConfig = [
  { path: '', component: CharacterListComponent },
  { path: '*', component: CharacterListComponent },
  { path: 'character/edit', component: CharacterEditComponent },
  { path: 'character/edit/:id', component: CharacterEditComponent },
  { path: 'character/:id', component: CharacterComponent },
  // { path: 'chat', component: ChatRoomComponent },
  { path: 'login', component: loginPageComponent },
  { path: 'character', component: CharacterListComponent }
  // { path: 'app', component: AppComponent }
  
  // { path: 'escapeTogether', component: EscapeTogetherComponent }

];

export const ROUTER_PROVIDERS = [
  provideRouter(routes),
  {provide: PLATFORM_DIRECTIVES, useValue: ROUTER_DIRECTIVES, multi: true}
];
