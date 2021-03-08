import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnitsComponent } from './units.component';
import { ListViewComponent } from './list-view/list-view.component';
import { AddViewComponent } from './add-view/add-view.component';
import { EditViewComponent } from './edit-view/edit-view.component';
import { BidHistoryComponent } from './bid-history/bid-history.component';


const routes: Routes = [
  {
    path: '', component: UnitsComponent, children: [
      {
        path: '', component: ListViewComponent
      },
      {
        path: 'new', component: AddViewComponent,
        data: {
          title: 'new',
          breadcrumb: [
            {
              label: 'Units',// pageOneID Parameter value will be add
              url: '/units'
            },
            {
              label: 'New',// pageTwoID Parameter value will be add
              url: ''
            }
          ]
        },
      },
      {
        path: 'edit/:id/:unit_name', component: EditViewComponent,
        data: {
          title: 'edit',
          breadcrumb: [
            {
              label: 'Units',// pageOneID Parameter value will be add
              url: '/projecunitsts'
            },
            {
              label: '{{unit_name}}',// pageTwoID Parameter value will be add
              url: ''
            }
          ]
        },
      },
      {
        path: 'bid_history/:id/:unit_name', component: BidHistoryComponent,
        data: {
          title: 'edit',
          breadcrumb: [
            {
              label: 'Units',// pageOneID Parameter value will be add
              url: '/projecunitsts'
            },
            {
              label: '{{unit_name}}',// pageTwoID Parameter value will be add
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
export class UnitsRoutingModule { }
