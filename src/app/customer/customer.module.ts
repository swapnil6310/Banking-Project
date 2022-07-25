import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from '../customer/customer/customer.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AddEditModalComponent } from '../customer/add-edit-modal/add-edit-modal.component';

@NgModule({
  declarations: [
    CustomerComponent,
    AddEditModalComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  providers:[
   
  ]
})
export class CustomerModule { }
