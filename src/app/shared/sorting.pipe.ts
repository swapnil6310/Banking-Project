import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sorting'
})
export class SortingPipe implements PipeTransform {
  sortedArray: any = [];

  transform(list: any[], fieldName: string, isSort: any) {
    this.sortedArray = list;

    if (isSort === true || isSort === 1) {
      this.sortedArray.sort((a: any , b: any) =>
        a[fieldName] > b[fieldName] ? 1 : -1
      );
    }
    if (isSort === false || isSort === 0) {
      this.sortedArray.sort((a: any, b: any) =>
        a[fieldName] < b[fieldName] ? 1 : -1
      );
    }
    return this.sortedArray;
  }
}