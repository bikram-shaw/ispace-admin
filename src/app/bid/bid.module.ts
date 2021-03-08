import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DataTablesModule} from 'angular-datatables';
import { BidRoutingModule } from './bid-routing.module';
import { BidHistoryComponent } from './bid-history/bid-history.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListViewComponent } from './list-view/list-view.component';


@NgModule({
  declarations: [BidHistoryComponent,  ListViewComponent],
  imports: [
    CommonModule,
    BidRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    ModalModule.forRoot()

  ]
})
export class BidModule { }
