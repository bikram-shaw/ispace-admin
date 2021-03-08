import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmailComponent } from './email/email.component';
import { NotificationComponent } from './notification.component';
import { NotificationModule } from './notification.module';
import { PushNotificationComponent } from './push-notification/push-notification.component';
import { SettingsComponent } from './settings/settings.component';
import { SmsComponent } from './sms/sms.component';

const routes: Routes = [
{path:'',component:NotificationComponent,children: [
  {
    path: 'settings', component: SettingsComponent,
    data: { title: 'notification',
          breadcrumb:
          [
            {
              label: 'Notification',
              url: ''
            }
          ]
         },
  },
  {
    path: 'sms', component: SmsComponent,
    loadChildren: () => import('./sms/sms.module').then(m => m.SmsModule),
    data: { title: 'notification',
          breadcrumb:
          [
            {
              label: 'Notification',
              url: ''
            }
          ]
         },
  },
  {
    path: 'email', component: EmailComponent,
    loadChildren: () => import('./email/email.module').then(m => m.EmailModule),
    data: { title: 'notification',
          breadcrumb:
          [
            {
              label: 'Notification',
              url: ''
            }
          ]
         },
  },

  {
    path: 'push', component: PushNotificationComponent,
    loadChildren: () => import('./push-notification/push-notification.module').then(m => m.PushNotificationModule),
    data: { title: 'notification',
          breadcrumb:
          [
            {
              label: 'Notification',
              url: ''
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
export class NotificationRoutingModule { }
