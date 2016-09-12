import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterBy',
    pure: false
})

export class FilterByPipe implements PipeTransform {
    transform(list: any[], filter: any): any {
        // console.log('list:',list);
        // console.log('filter:',filter);
        if (!list) return [];
        if (!filter) return list;
        return list.filter(game=>{
            return (game.name.toLowerCase().indexOf(filter.byName.toLowerCase()) !== -1)
        });
    }
}