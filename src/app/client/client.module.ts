import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientRoutingModule } from './client-routing.module';
import { AddClientComponent } from './add-client/add-client.component';
import { DataTablesModule } from 'angular-datatables';





@NgModule({
  declarations: [
    AddClientComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    FormsModule,
    ReactiveFormsModule, DataTablesModule

  ]
})
export class ClientModule { }
