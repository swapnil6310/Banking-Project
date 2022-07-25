import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JournalComponent } from './journal/journal.component';

const routes: Routes = [
  {path: '', redirectTo:'journalEntries', pathMatch:'full'},
  {
    path: 'journalEntries',
    component:JournalComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JournalRoutingModule { }
