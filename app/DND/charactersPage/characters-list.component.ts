import { Component, OnInit, ViewChildren } from '@angular/core';
import { CharacterModel } from './character.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterByPipe } from '../../shared/pipes/filter-list.pipe';
import { characterDetailsComponent } from './character-details.component';
import { CharacterService } from './characters.service';
import { CharacterFilterComponent } from './character-filter.component';

@Component({
  moduleId: module.id,
  styles: [`li {
                list-style: none;
                display:inline-block;
                padding:1em;
                margin:1em;
                /*border: 1px solid gray;*/
                background-color:#e6eef1;
                border-radius: 0.2em;
                text-align: center;
                font-size: 2em;
                color:darkblue;
            }`],
  pipes: [FilterByPipe],
  directives: [characterDetailsComponent, CharacterFilterComponent],
  // selector: 'monster-list',
  template: `
    <section>
      <!--<h2>All Characters</h2>-->

      <character-filter (filterChange)="filter = $event"></character-filter>

      <a routerLink="/character/edit" class="btn btn-primary">+ Add</a>
      <ul>
        <li *ngFor="let character of characters | filterBy:filter">
        <!--<li *ngFor="let character of characters">-->
            <character-details [character]="character" (click)="details(character.id)"></character-details>
            <div class="text-center">
              <button class="btn btn-danger" (click)="removeCharacter(character.id)">Delete</button>
              <a routerLink="/character/edit/{{character.id}}" class="btn btn-success">Edit</a>
            </div>
        </li>
      </ul>
    </section>
  `
})
export class CharacterListComponent implements OnInit {
  private userName;
  private filter :{};
  private characters : CharacterModel[];

  constructor(private characterService : CharacterService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
      if(!this.characterService.getUsername()) this.router.navigate(['/login']);
      this.userName = this.characterService.getUsername();
      this.filter = {byUserName:this.userName, byName: ''}
      const prmMonsters = this.characterService.query();

      prmMonsters.then((characters : CharacterModel[]) => {
          this.characters = characters;
          console.log('characters:', this.characters);

      });
      prmMonsters.catch(err => {
          alert('Sorry,cannot load the characters, try again later');
          console.log('Cought an error in CharacterList', err);
      });
      }
      removeCharacter(characterId : string) {
          this.characterService.remove(characterId)
            .then((characters : CharacterModel[])=> {
                this.characters = characters;
            });
      }
      details(characterId){
          this.router.navigate(['/character/' + characterId]);
      }
}
