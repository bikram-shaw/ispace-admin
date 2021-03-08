import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnitsRoutingModule } from './units-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditViewComponent } from './edit-view/edit-view.component';
import { AddViewComponent } from './add-view/add-view.component';
import { ListViewComponent } from './list-view/list-view.component';
import { DataTablesModule } from 'angular-datatables';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { NgxLoadingModule } from 'ngx-loading';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BidHistoryComponent } from './bid-history/bid-history.component';


@NgModule({
  declarations: [ EditViewComponent, AddViewComponent, ListViewComponent,BidHistoryComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UnitsRoutingModule,
    DataTablesModule,
    AccordionModule.forRoot(),
    PopoverModule.forRoot(),
    ModalModule.forRoot(),
    NgxLoadingModule.forRoot({})
  ]
})
export class UnitsModule { }
