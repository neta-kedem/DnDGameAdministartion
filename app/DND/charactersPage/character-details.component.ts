import { Component, OnInit } from '@angular/core';
// import { CharacterService } from './character.service';
import { CharacterModel } from './character.model';

@Component({
  moduleId: module.id,
  selector: 'character-details',
  // styleUrls: [`monster.css`],
  inputs: ['character'],
  template: `
          <section>
            <h5>{{character.name}}</h5>
            <a routerLink="/character/{{character.id}}/{{character.name}}">
            </a>
            <h6>level: {{character.level}}</h6>
            <h6>hp: {{character.maxHP}}</h6>

          </section>
          `

})
export class characterDetailsComponent implements OnInit {

  private character : CharacterModel;

  constructor() { }

  ngOnInit() { }

}
