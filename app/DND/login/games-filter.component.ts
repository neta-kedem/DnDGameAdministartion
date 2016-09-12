import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'games-filter',
    outputs: ['filterChange'],
    // styles: [`section {background-color: #DDD; margin: 2em 0; padding:0.4em 1em 1em; border-radius:0.4em} `],
    template: `
      <section>
        By Name: <input type="text" [(ngModel)]="filter.byName" (input)="filterChanged()" />
      </section>

  `
})
export class GamesFilterComponent implements OnInit {

    private filterChange = new EventEmitter();

    private filter = {byName: ''};
    constructor() { }

    ngOnInit() { }

    filterChanged() {
        this.filterChange.emit(this.filter);
    }

}
