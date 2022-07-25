import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JournalRoutingModule } from './journal-routing.module';
import { JournalComponent } from './journal/journal.component';
import { AddEditModalComponent } from '../journal/add-edit-modal/add-edit-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    JournalComponent,
    AddEditModalComponent,
    
  ],
  imports: [
    CommonModule,
    JournalRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ]
})
export class JournalModule { }
