import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersRoutingModule } from './users-routing.module';
import { DataTablesModule } from 'angular-datatables';
import { ListViewComponent } from './list-view/list-view.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';


@NgModule({
  declarations: [ListViewComponent, AddUserComponent, EditUserComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    AccordionModule.forRoot(),
  ]
})
export class UsersModule { }
