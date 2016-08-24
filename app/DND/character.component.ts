import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CharacterService} from './characters.service';
import {CharacterModel} from './character.model';


@Component({
  moduleId: module.id,
  // styleUrls: [`character.css`],
  // selector: 'character-list',
  template: `
    <section *ngIf="character">
      <h2>Character {{character.name}}</h2>

    </section>
  `
})
export class CharacterComponent implements OnInit {

  private character : CharacterModel;

  constructor(
                private route: ActivatedRoute,
                private characterService : CharacterService
  ) { }

  ngOnInit() {
   this.route.params.subscribe(params => {
    //  console.log('Params are: ', params);
     const id = params['id'];
     const prmCharacter = this.characterService.get(id);
     prmCharacter.then((character: CharacterModel) => {
       this.character = character;
     });
   });
  }



}
