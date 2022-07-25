import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SortingPipe } from './sorting.pipe';
import { SearchingPipe } from './searching.pipe';


@NgModule({
  declarations: [
    SortingPipe,
    SearchingPipe
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports: [SortingPipe,SearchingPipe]
})
export class SharedModule { }
