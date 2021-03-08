import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddViewComponent } from './add-view/add-view.component';
import { ListViewComponent } from './list-view/list-view.component';
import { SubscriptionComponent } from './subscription.component';

const routes: Routes = [

  {
    path: '', component: SubscriptionComponent, children: [
      {
        path: '', component: ListViewComponent
      },
      {
        path: 'new', component: AddViewComponent,
        data: {
          title: 'new',
          breadcrumb: [
            {
              label: 'Subscription',// pageOneID Parameter value will be add
              url: '/subscription'
            },
            {
              label: 'New',// pageTwoID Parameter value will be add
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
export class SubscriptionRoutingModule { }
