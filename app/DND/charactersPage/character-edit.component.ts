import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, REACTIVE_FORM_DIRECTIVES, FormControl} from '@angular/forms';
import {CharacterService} from './characters.service';
import {CharacterModel} from './character.model';
// import {UploadDemoComponent} from '../shared/upload-demo/upload-demo.component'

@Component({
  moduleId: module.id,
  // selector: 'character-edit',
  templateUrl: 'character-edit.component.html',
  directives: [REACTIVE_FORM_DIRECTIVES],
  styles:[`.stats{padding-left:30px;}`]
})
export class CharacterEditComponent implements OnInit {

  private frmCharacter: FormGroup;
  private characterToEdit: CharacterModel;
  public title: string;
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private characterService: CharacterService) { }

  ngOnInit() {
    if(!this.characterService.getUsername()) this.router.navigate(['/login']);
    console.log('this.route.params', this.route.params);
    this.title = 'Create new character';
    this.prepareForm();
    this.route.params.subscribe(params => {
        const id = params['id'];
        // This means EDIT mode
        if (id) {
          this.title = 'Edit your character';
          this.characterService.get(id)
            .then((character) =>{

                this.characterToEdit = character;
                console.log('in edit, ajax returned : ',  this.characterToEdit,  this.frmCharacter.controls );
                (<FormControl>this.frmCharacter.controls['name']).updateValue(character.name);
                (<FormControl>this.frmCharacter.controls['whoSeeMe']).updateValue(character.whoSeeMe);
                (<FormControl>this.frmCharacter.controls['race']).updateValue(character.race);
                (<FormControl>this.frmCharacter.controls['characterClass']).updateValue(character.characterClass);
                (<FormControl>this.frmCharacter.controls['role']).updateValue(character.role);
                (<FormControl>this.frmCharacter.controls['level']).updateValue(character.level);
                
                (<FormControl>this.frmCharacter.controls['intelligence']).updateValue(character.stats.intelligence);
                (<FormControl>this.frmCharacter.controls['strength']).updateValue(character.stats.strength);
                (<FormControl>this.frmCharacter.controls['constitution']).updateValue(character.stats.constitution);
                (<FormControl>this.frmCharacter.controls['dexterity']).updateValue(character.stats.dexterity);
                (<FormControl>this.frmCharacter.controls['charisma']).updateValue(character.stats.charisma);
                (<FormControl>this.frmCharacter.controls['wisdom']).updateValue(character.stats.wisdom);

                (<FormControl>this.frmCharacter.controls['maxHP']).updateValue(character.maxHP);
                (<FormControl>this.frmCharacter.controls['currHP']).updateValue(character.currHP);
            });
        }
      });
  }
  save() {
    console.log('save:');
    const characterId = (this.characterToEdit)?  this.characterToEdit.id : undefined;
    console.log('this.frmCharacter.value:',this.frmCharacter.value);
    this.characterService.save(this.frmCharacter.value, characterId)
      .then(()=>{
          this.router.navigate(['/character']);
      });

  }

  prepareForm() {
     this.frmCharacter = this.formBuilder.group({
      name: ['',
              Validators.compose([Validators.required,
                                  Validators.minLength(3),
                                  Validators.maxLength(100)])],
      whoSeeMe:[this.characterService.getUsername(), Validators.required],
      race:['', Validators.required],
      characterClass:['', Validators.required],
      role:['', Validators.required],
      level: [1, Validators.required],

      intelligence:[10, Validators.required],
      strength:[10, Validators.required],
      constitution:[10, Validators.required],
      dexterity:[10, Validators.required],
      charisma:[10, Validators.required],
      wisdom:[10, Validators.required],

      maxHP: ['', Validators.required],
      currHP: ['', Validators.required],
    });
  }
}
