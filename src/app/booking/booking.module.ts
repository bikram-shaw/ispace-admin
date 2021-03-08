import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingRoutingModule } from './booking-routing.module';
import { ListViewComponent } from './list-view/list-view.component';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [ListViewComponent],
  imports: [
    CommonModule,
    BookingRoutingModule,
    DataTablesModule
  ]
})
export class BookingModule { }
