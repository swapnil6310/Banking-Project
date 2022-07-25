import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searching'
})
export class SearchingPipe implements PipeTransform {

  transform(list: any[], searchItem: string): any {
    if ( !list) {
      
      return null;
    }
    if(!searchItem){
      return list;
    }
    
  if(list.length>0){
    let  customerList = [];
     customerList = list.filter((item: any) => {
      return JSON.stringify(item).toLowerCase().includes(searchItem);
      
    });
    if(customerList.length && customerList.length > 0){
      return customerList;
    } else {
      return [];
    }
    
  }
  }
}

