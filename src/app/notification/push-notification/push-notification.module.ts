import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { PushNotificationRoutingModule } from './push-notification-routing.module';
import { PushNotificationComponent } from './push-notification.component';
import { AddPnComponent } from './add-pn/add-pn.component';
import { UpdatePnComponent } from './update-pn/update-pn.component';


@NgModule({
  declarations: [PushNotificationComponent, AddPnComponent, UpdatePnComponent],
  imports: [
    CommonModule,
    PushNotificationRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PushNotificationModule { }
