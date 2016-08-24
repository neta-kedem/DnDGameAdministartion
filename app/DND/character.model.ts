export class CharacterModel {

  constructor(	private _id: string,
  				public name: string,
  				public whoSeeMe: string[],
  				public race: string,
  				public characterClass: string,
  				public role: string,
  				public level: number,
  				public stats: IStats,
  				public maxHP:number,
  				public currHP: number
  				// public HealPerDay: number,
  				// public HealLeft: number,
  				// public ActionPoint: number,
  				// public skills: string[]
  				) {}

  get id() {
    return this._id;
  }
  getImgUrl() {
    return `public/img/monster/${this.name}.png`;
  }
}

export interface IStats{
	intelligence: number,
	strangth: number,
	constitution: number,
	dexterity: number,
	charisma: number,
	wisdom: number
}