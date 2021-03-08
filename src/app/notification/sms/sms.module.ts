import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SmsRoutingModule } from './sms-routing.module';
import { AddSmsComponent } from './add-sms/add-sms.component';
import { UpdateSmsComponent } from './update-sms/update-sms.component';


@NgModule({
  declarations: [AddSmsComponent, UpdateSmsComponent],
  imports: [
    CommonModule,
    SmsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SmsModule { }
