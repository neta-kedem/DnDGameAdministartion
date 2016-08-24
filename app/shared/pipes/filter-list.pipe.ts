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
    if (filter.byUserName === 'netak') return list;
    return list.filter(item=>{
      return (item.name.toLowerCase()
              .indexOf(filter.byName.toLowerCase()) !== -1) 
              && (item.whoSeeMe.some((username)=>{return username === filter.byUserName}))
    })
  }
}
