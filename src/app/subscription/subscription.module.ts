import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DataTablesModule} from 'angular-datatables';
import { SubscriptionRoutingModule } from './subscription-routing.module';
import { SubscriptionComponent } from './subscription.component';
import { ListViewComponent } from './list-view/list-view.component';
import { AddViewComponent } from './add-view/add-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [SubscriptionComponent, ListViewComponent, AddViewComponent],
  imports: [
    CommonModule,
    SubscriptionRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SubscriptionModule { }
