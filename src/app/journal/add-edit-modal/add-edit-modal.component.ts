import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerInterface } from 'src/app/customer/customer-interface';
import { CustomerServiceService } from 'src/app/customer/customer-service.service';
import { AccountModal } from '../account-modal';
import { JournalModal } from '../journal-modal';
import { JournalServiceService } from '../journal-service.service';

@Component({
  selector: 'app-add-edit-modal',
  templateUrl: './add-edit-modal.component.html',
  styleUrls: ['./add-edit-modal.component.css'],
})
export class AddEditModalComponent implements OnInit {
  public transactionForm: FormGroup;
  public customerList: CustomerInterface[];
  private accountBalance: number = 50000;
  private cash: number = 5000;
  public inputValueCustomer: string = 'Self';
  public inputValueType: string = 'Choose ..';

  private responseObj: AccountModal | undefined;

  @Input()
  public transactionDataForEdit: JournalModal | undefined;

  constructor(
    public modal: NgbActiveModal,
    private fb: FormBuilder,
    private journalService: JournalServiceService,
    private custService: CustomerServiceService
  ) {
    this.customerList = [];

    this.transactionForm = this.fb.group({
      date: [''],
      type: ['',Validators.required],
      customer: ['', Validators.required],
      amount: ['', Validators.required],
      description: [''],
    });
  }

  ngOnInit(): void {
    // To set date in form
    const currentDate = new Date().toISOString().substring(0, 10);
    this.transactionForm.controls['date'].setValue(currentDate);

    // Fuction for getting customer detail
    this.getCustomerService();

    // Fuction for getting Account Balance and Cash
    this.journalService.data.subscribe((response) => {
      console.log('bro...', response);
      this.responseObj = response;
      if (this.responseObj.account && this.responseObj.cash) {
        this.accountBalance = this.responseObj.account;
        this.cash = this.responseObj.cash;
      }
    });
  }

  // Method for posting data to server
  public submittedData(): void {
    console.log('type', this.transactionForm.value);
    if (
      this.transactionForm.value.type === 'Expense' &&
      this.transactionForm.value.amount > this.cash
    ) {
      alert('You cannot Expense more than your Cash');
    } else {
      if (
        this.transactionForm.value.type == 'Expense' &&
        this.transactionForm.value.customer == 'Self'
      ) {
        this.accountBalance =
          this.accountBalance + this.transactionForm.value.amount;
        this.cash = this.cash - this.transactionForm.value.amount;
      } else if (
        this.transactionForm.value.type == 'Expense' &&
        this.transactionForm.value.customer
      ) {
        this.cash = this.cash - this.transactionForm.value.amount;
      } else if (
        this.transactionForm.value.type == 'Income' &&
        this.transactionForm.value.customer == 'Self'
      ) {
        this.accountBalance =
          this.accountBalance - this.transactionForm.value.amount;
        this.cash = this.cash + this.transactionForm.value.amount;
      } else if (
        this.transactionForm.value.type == 'Income' &&
        this.transactionForm.value.customer
      ) {
        this.cash = this.cash + this.transactionForm.value.amount;
      }

      let obj = {
        account: this.accountBalance,
        cash: this.cash,
      };
      this.journalService.sendData(obj);

      this.journalService.createCustomer(this.transactionForm.value).then(() => {
        this.closeModal();
        
      });
    }
  }

  // To close Modal
  public closeModal(): void {
    this.modal.close();
  }

  public showOptionForType(data: string): void {
    this.transactionForm.controls['type'].setValue(data);
    this.inputValueType = data;
  }

  public showOptionForCustomer(data: string): void {
    this.inputValueCustomer = data;
    this.transactionForm.controls['customer'].setValue(data);
  }

  private getCustomerService(): void {
    this.custService.getCustomers()
      .subscribe((res) => {
        this.customerList = res.map((e) => {
          return {
            id: e.payload.doc.id,
            ...(e.payload.doc.data() as CustomerInterface),
          };
        });
      // this.customerList = response;
      })
}
}
