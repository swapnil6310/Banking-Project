import { Component, OnInit } from "@angular/core";

import { NgbModal, NgbModalConfig } from "@ng-bootstrap/ng-bootstrap";
import { AddEditModalComponent } from "../add-edit-modal/add-edit-modal.component";
import { JournalModal } from "../journal-modal";
import { JournalServiceService } from "../journal-service.service";

@Component({
  selector: "app-journal",
  templateUrl: "./journal.component.html",
  styleUrls: ["./journal.component.css"],
})
export class JournalComponent implements OnInit {
  transactionDetail: JournalModal[] | undefined;
  total: number = 0;
  // indNum:number=0
  constructor(
    config: NgbModalConfig,
    private readonly modalService: NgbModal,
    private readonly journalService: JournalServiceService
  ) {
    config.backdrop = "static";
    config.keyboard = false;
  }

  ngOnInit() {
    this.getDataFromApi();
  }

  //  Function to open Modal
  public openModel(): void {
    const modalRef = this.modalService.open(AddEditModalComponent, {
      size: "md",
      centered: true,
    });
    modalRef.result.then(() => {});
  }

  /**
   * Function for deleting employee data from table
   * @param employeeId Employee Id to be deleted
   */
  public deleteDataFromApi(employeeId: any): void {
    this.journalService.deleteCustomer(employeeId).then(() => {
      this.getDataFromApi();
    });
  }

  // Function for calling Employee Data from server
  private getDataFromApi(): void {
    this.total = 0;
    this.journalService.getCustomers().subscribe((res) => {
    this.total = 0;
      this.transactionDetail = res.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as JournalModal),
        };
      });
console.log("meow",this.transactionDetail)
      for (let i = 0; i < this.transactionDetail.length; i++) {
        this.total += this.transactionDetail[i].amount;
      }
    });
  }
}
