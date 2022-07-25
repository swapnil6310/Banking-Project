import { Component } from '@angular/core';
import { AccountModal } from './journal/account-modal';

import { JournalServiceService } from './journal/journal-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public account: number;
  public cash: number;
  private responseObj: AccountModal | undefined;

  constructor(private journalService: JournalServiceService) {
    this.account = 0;
    this.cash = 0;
  }

  ngOnInit() {
    this.getAccountData();
  }

  // function to get account balance and cash balance
  private getAccountData(): void {
    this.journalService.data.subscribe((response) => {
      this.responseObj = response;
      if (this.responseObj.account && this.responseObj.cash) {
        this.account = this.responseObj.account;
        this.cash = this.responseObj.cash;
      }
    });
  }
}
