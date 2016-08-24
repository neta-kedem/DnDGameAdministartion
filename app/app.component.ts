import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';


// import {MonsterService} from './monster/monster.service';
// import {ChatRoomService} from './chat/chat-room.service';
import { LoginService } from './DND/login.service';
import { CharacterService } from './DND/characters.service';



import * as io from 'socket.io-client';


@Component({
  selector: 'my-app',
  moduleId: module.id,
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [CharacterService, LoginService, ToastsManager, {provide: 'io', useValue: io}]

})
export class AppComponent implements OnInit{
    constructor (private router: Router) {}

    ngOnInit () {
      this.router.navigate(['/login']);
    }
}