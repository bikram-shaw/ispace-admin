import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEmailComponent } from './add-email/add-email.component';
import { EmailComponent } from './email.component';
import { UpdateEmailComponent } from './update-email/update-email.component';

const routes: Routes = [
  {
    path: '', component: EmailComponent, children: [

    {
      path: '', component: UpdateEmailComponent,
      data: {
        title: 'Email',
        breadcrumb: [
          {

            label: 'Notification',
            url:''
          }

        ]
      },
    },

    {
      path: 'add', component: AddEmailComponent,
      data: {
        title: 'new',
        breadcrumb: [
          {

            label: 'Notification',
            url:''
          },

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
export class EmailRoutingModule { }
