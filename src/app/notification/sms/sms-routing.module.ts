import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddSmsComponent } from './add-sms/add-sms.component';
import { SmsComponent } from './sms.component';
import { UpdateSmsComponent } from './update-sms/update-sms.component';

const routes: Routes = [
  {
    path: '', component: SmsComponent, children: [
    {
      path: '', component: UpdateSmsComponent,
      data: {
        title: 'Email',
        breadcrumb: [
          {

            label: 'Notification',
            url:''
          },


        ]
      },
    },
    {
      path: 'add', component: AddSmsComponent,
      data: {
        title: 'new',
        breadcrumb: [
          {

            label: 'Notification',
            url:''
          }
        ]
      },
    },

  ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SmsRoutingModule { }
