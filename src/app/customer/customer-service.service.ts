import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { CustomerInterface } from "./customer-interface";

@Injectable({
  providedIn: "root",
})
export class CustomerServiceService {
  constructor(private db: AngularFirestore) {}

  createCustomer(customer: CustomerInterface) {
    return this.db.collection("customers").add(customer);
  }

  getCustomers() {
    return this.db.collection("customers").snapshotChanges();
  }

  updateCustomer(customer: CustomerInterface, customerId: string) {
    return this.db.collection("customers").doc(customerId).set(customer);
  }

  deleteCustomer(customerId: string) {
    return this.db.collection("customers").doc(customerId).delete();
  }
}
