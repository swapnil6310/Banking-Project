import { Injectable } from '@angular/core';
import { JournalModal } from './journal-modal';
import { BehaviorSubject, Observable } from 'rxjs';
import { AccountModal } from './account-modal';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class JournalServiceService {

  
  private dataSource: BehaviorSubject<AccountModal> = new BehaviorSubject<AccountModal>({account:50000, cash:5000});
  data: Observable<AccountModal> = this.dataSource.asObservable();

  // constructor(private http:HttpClient) { }
  
  // postData(data:JournalModal){
  //   return this.http.post<any>(this.transactionUrl,data);
  // }
  // getData(){
  //   return this.http.get<JournalModal[]>(this.transactionUrl);
  // }
  
  // updateData(data:any,id:any){
  //   return this.http.put(this.transactionUrl+"/"+id,data);
  // }
  // deleteData(id:any){
  //   return this.http.delete(this.transactionUrl+"/"+id);
  // }
  // sendData(data: AccountModal) {
  //   this.dataSource.next(data);
  // }

  constructor(private db: AngularFirestore) {}

  createCustomer(customer: JournalModal) {
    return this.db.collection("jounalList").add(customer);
  }

  getCustomers() {
    return this.db.collection("jounalList").snapshotChanges();
  }

  updateCustomer(customer: JournalModal, customerId: string) {
    return this.db.collection("jounalList").doc(customerId).set(customer);
  }

  deleteCustomer(customerId: string) {
    return this.db.collection("jounalList").doc(customerId).delete();
  }
  sendData(data: AccountModal) {
    this.dataSource.next(data);
  }
}
