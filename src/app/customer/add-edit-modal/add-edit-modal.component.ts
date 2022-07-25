import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerInterface } from 'src/app/customer/customer-interface';
import { CustomerServiceService } from 'src/app/customer/customer-service.service';

@Component({
  selector: 'app-add-edit-modal',
  templateUrl: './add-edit-modal.component.html',
  styleUrls: ['./add-edit-modal.component.css'],
})
export class AddEditModalComponent implements OnInit {
  public customerForm: FormGroup;

  @Input()
  private custDataForEdit: CustomerInterface | undefined;

  constructor(
    public modal: NgbActiveModal,
    private fb: FormBuilder,
    private custService: CustomerServiceService
  ) {
    this.customerForm = this.fb.group({
      
      customerId:[''],
      customerName: ['', Validators.required],
      email: ['', Validators.required],
      contact: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]{10}$'),
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
    });
  }

  ngOnInit(): void {
    //console.log("Swapnil",this.custDataForEdit)
    // This will patch the value for edit when we click edit
    if (this.custDataForEdit) {
      this.customerForm.patchValue({
        customerId:this.custDataForEdit.id,
        customerName: this.custDataForEdit.customerName,
        email: this.custDataForEdit.email,
        contact: this.custDataForEdit.contact,
      });
    }
    //console.log("Patch",this.customerForm.value)
  }

  get custFormControl() {
    return this.customerForm.controls;
  }

  // Method for posting and updating Customer Data
  public submittedData(): void {
    if (this.custDataForEdit) {
      console.log("hey==>",this.custDataForEdit)
      this.custService
        .updateCustomer(this.customerForm.value, this.customerForm.value.customerId)
        .then(() => {
          console.warn('Data Updated Successfully');
          this.closeModal();
        });
    } else {
      this.custService.createCustomer(this.customerForm.value).then(() => {
        console.warn('Data Added Successfully ~~');
        this.closeModal();
      });
    }
  }

  // To close Modal
  public closeModal(): void {
    this.modal.close();
  }
}
