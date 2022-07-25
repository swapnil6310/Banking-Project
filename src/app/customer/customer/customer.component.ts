import { PathLocationStrategy } from "@angular/common";
import { Component, HostListener, OnInit } from "@angular/core";

import { NgbModal, NgbModalConfig } from "@ng-bootstrap/ng-bootstrap";
import { CustomerInterface } from "src/app/customer/customer-interface";
import { CustomerServiceService } from "src/app/customer/customer-service.service";
import { AddEditModalComponent } from "../add-edit-modal/add-edit-modal.component";

@Component({
  selector: "app-customer",
  templateUrl: "./customer.component.html",
  styleUrls: ["./customer.component.css"],
})
export class CustomerComponent implements OnInit {
  public customerDetail: CustomerInterface[];
  public columnToBeSorted: string;
  public isSort: number;

  public offset: number = 0;
  public limit: number = 3;
  public searchText: string;
  public pageButtons: Array<number> = [];
  public pages: number = 0;
  public buttonToShow: number = 0;
  public selectedPage: number = 0;
  public customerDetailData: CustomerInterface[];
  public fromItemsPerPage: number = 0;
  public toItemsPerPage: number = 0;
  public perPageItem: number = 5;
  public customerColumns = ["Id", "Customer Name", "email", "Contact"];

  constructor(
    config: NgbModalConfig,
    private readonly modalService: NgbModal,
    private readonly custService: CustomerServiceService
  ) {
    this.columnToBeSorted = "";
    this.customerDetail = [];
    this.customerDetailData = [];
    this.isSort = -1;
    this.searchText = "";
    config.backdrop = "static";
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.getDataFromApi();
  }

  /**
   *  Function to open Modal
   * @param editData Customer Data to be Edited
   */
  public openModel(editData: CustomerInterface | null): void {
    //console.log("edit",editData)
    const modalRef = this.modalService.open(AddEditModalComponent, {
      size: "md",
    });
    modalRef.componentInstance.custDataForEdit = editData;
    modalRef.result.then(() => {
      this.getDataFromApi(); 
    });
  }

  /**
   * method for sorting column
   * @param tableColumn taking column to be sorted
   */
  public sortedColumn(tableColumn: string): void {
    if (tableColumn == "Customer Name") {
      this.columnToBeSorted = "customerName";
    } else if (tableColumn == "Email") {
      this.columnToBeSorted = "email";
    } else if (tableColumn == "Contact") {
      this.columnToBeSorted = "contact";
    }
    if (this.isSort == 1) {
      this.isSort = 0;
    } else if (this.isSort == 0) {
      this.isSort = -1;
      this.getDataFromApi();
    } else if (this.isSort == -1) {
      this.isSort = 1;
    }
  }

  /**
   * Function for deleting employee data from table
   * @param employeeId Employee Id to be deleted
   */
  public deleteDataFromApi(employeeId: string): void {
    console.log("del=====>", employeeId);
    alert("Are You Sure You Want To Delete !");
    this.custService.deleteCustomer(employeeId).then(() => {
      this.getDataFromApi();
    });
  }

  /**
   * Method for displaying pageWise Data
   * @param page Variable for taking page number
   */
  public pageValue(page: number): void {
    // console.log('page==', page, "buttonToShow==", this.buttonToShow);
    this.pageButtons = [];
    this.selectedPage = page;
    if (page === this.pages) {
      this.offset = page - 2;
      this.limit = page;
      for (let i = this.offset; i <= this.limit; i++) {
        this.pageButtons.push(i);
      }
    } else if (page >= 3) {
      this.offset = page - 1;
      this.limit = page + 1;
      for (let i = this.offset; i <= this.limit; i++) {
        this.pageButtons.push(i);
      }
    } else if (page >= 1) {
      this.offset = 0;
      this.limit = 3;
      for (let i = 1; i <= this.pages; i++) {
        this.pageButtons.push(i);
        this.pageButtons = this.pageButtons.slice(this.offset, this.limit);
      }
    }
    this.toItemsPerPage = page * this.perPageItem;
    this.fromItemsPerPage = this.toItemsPerPage - this.perPageItem;
    this.customerDetailData = this.customerDetail;
    this.customerDetailData = this.customerDetailData.slice(
      this.fromItemsPerPage,
      this.toItemsPerPage
    );
  }

  // Function for calling Employee Data from server
  private getDataFromApi() {
    this.custService.getCustomers()
      // .subscribe((res)=>{
      //   console.log(res)
      // })
      .subscribe((res) => {
        this.customerDetail = res.map((e) => {
          return {
            id: e.payload.doc.id,
            ...(e.payload.doc.data() as CustomerInterface),
          };
        });
        console.log("Api response==>", this.customerDetail);
        this.pages = Math.ceil(this.customerDetail.length / 5);
        this.pageValue(1);
      });
  }
}
