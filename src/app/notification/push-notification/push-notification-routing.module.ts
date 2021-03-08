import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPnComponent } from './add-pn/add-pn.component';
import { PushNotificationComponent } from './push-notification.component';
import { UpdatePnComponent } from './update-pn/update-pn.component';

const routes: Routes = [
  {
    path: '', component: PushNotificationComponent, children: [

    {
      path: '', component: UpdatePnComponent,
      data: {
        title: 'Push Notification',
        breadcrumb: [
          {

            label: 'Notification',
            url:''
          },


        ]
      },
    },

    {
      path: 'add', component: AddPnComponent,
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
export class PushNotificationRoutingModule { }
