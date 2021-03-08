import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationRoutingModule } from './notification-routing.module';
import { NotificationComponent } from './notification.component';
import { SettingsComponent } from './settings/settings.component';
import { EmailComponent } from './email/email.component';
import { SmsComponent } from './sms/sms.component';
import { HttpClientModule} from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { EmailModule } from './email/email.module';



@NgModule({
  declarations: [NotificationComponent, SettingsComponent, EmailComponent, SmsComponent],
  imports: [
    CommonModule,
    NotificationRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    EmailModule


  ]

})
export class NotificationModule { }
