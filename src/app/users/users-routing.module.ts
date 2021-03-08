import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ListViewComponent } from './list-view/list-view.component';

import { UsersComponent } from './users.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children:[
      {
        path:'',
        component:ListViewComponent,

      },
      {
        path: 'new', component: AddUserComponent,
        data: {
          title: 'new',
          breadcrumb: [
            {
              label: 'Users',// pageOneID Parameter value will be add
              url: '/users'
            },
            {
              label: 'New',// pageTwoID Parameter value will be add
              url: ''
            }
          ]
        },
      },
      {
        path: 'edit/:id', component: EditUserComponent,
        data: {
          title: 'edit',
          breadcrumb: [
            {
              label: 'Users',// pageOneID Parameter value will be add
              url: '/users'
            },
            {
              label: 'edit',// pageTwoID Parameter value will be add
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
export class UsersRoutingModule { }
