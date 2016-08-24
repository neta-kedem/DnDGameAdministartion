import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {CharacterModel} from './character.model'; 

@Injectable()
export class CharacterService {

  private baseUrl = 'http://localhost:3003/data/character/';
  constructor(private http: Http) {}

  // query (GETs a list)
  query(): Promise<CharacterModel[]> {

	let prmChar = this.http.get(this.baseUrl)
	  .toPromise()
	  .then(res => {
		const jsonCharacters = res.json();
		return jsonCharacters.map((jsonCharacter : any) =>
		   new CharacterModel(
									jsonCharacter._id,
									jsonCharacter.name,
									jsonCharacter.whoSeeMe,
									jsonCharacter.race,
									jsonCharacter.characterClass,
									jsonCharacter.role,
									jsonCharacter.level,
									jsonCharacter.stats,
									jsonCharacter.maxHP,
									jsonCharacter.currHP
							))
	  });

	prmChar.catch(err => {
	  console.log('CharacterService::query - Problem talking to server', err);
	});

	return prmChar;
  }

  // get (GETs a single)
  get(id: string) : Promise<CharacterModel> {
	let prmChar = this.http.get(this.baseUrl + id)
	  .toPromise()
	  .then(res => {
		const jsonCharacter = res.json();
		return new CharacterModel(
									jsonCharacter._id,
									jsonCharacter.name,
									jsonCharacter.whoSeeMe,
									jsonCharacter.race,
									jsonCharacter.characterClass,
									jsonCharacter.role,
									jsonCharacter.level,
									jsonCharacter.stats,
									jsonCharacter.maxHP,
									jsonCharacter.currHP
									);
	  });

	prmChar.catch(err => {
	  console.log('CharacterService::get - Problem talking to server');
	});
	return prmChar;

  }

  // DELETE 
  remove(id: string) : Promise<CharacterModel[]> {
	let prmChar = this.http.delete(this.baseUrl + id)
	  .toPromise()
	  .then(res => {
		return this.query();
	  });

	prmChar.catch(err => {
	  console.log('CharacterService::remove - Problem talking to server', err);
	});
	return prmChar;
  }

  // save - Adds (POST) or update (PUT)  
  save(characterData: any, id?: string) : Promise<CharacterModel>{

	let response : any;
	let prmChar : Promise<CharacterModel>;
	let stats = { intelligence:characterData.intelligence,
						strangth:characterData.strangth,
						constitution:characterData.constitution,
						dexterity:characterData.dexterity,
						charisma:characterData.charisma,
						wisdom:characterData.wisdom};
	let character = {name:characterData.name,
									whoSeeMe:characterData.whoSeeMe,
									race:characterData.race,
									characterClass:characterData.characterClass,
									role:characterData.role,
									level:characterData.level,
									stats:stats,
									maxHP:characterData.maxHP,
									currHP:characterData.currHP
									};
	if (id) {
	  const url = this.baseUrl + id;
	  response = this.http.put(url, character)
	} else {
		const url = this.baseUrl;
	   response = this.http.post(url, character)
	}

	prmChar = response.toPromise()
	  .then((res : any) => {
		  const jsonCharacter = res.json();
		  console.log('jsonCharacter:',jsonCharacter);

		  return new CharacterModel(
									jsonCharacter._id,
									jsonCharacter.name,
									jsonCharacter.whoSeeMe.split(' '),
									jsonCharacter.race,
									jsonCharacter.characterClass,
									jsonCharacter.role,
									jsonCharacter.level,
									stats,
									jsonCharacter.maxHP,
									jsonCharacter.currHP
									);
	  });

	prmChar.catch(err => {
	  console.log('CharacterService::save - Problem talking to server', err);
	});
	return prmChar;
  }
  
  getUsername(){
	return localStorage.getItem('DNDUsername');
  }
}
