import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListViewComponent } from '../bid/list-view/list-view.component';
import { BidHistoryComponent } from './bid-history/bid-history.component';
import { BidComponent } from './bid.component';

const routes: Routes = [
  {
    path: '',component: BidComponent,children: [
      {
        path: '', component: ListViewComponent
      },
      {
        path: 'bid-history', component: BidHistoryComponent,
        data: {
          title: 'history',
          breadcrumb: [
            {
              label: 'Bids',// pageOneID Parameter value will be add
              url: '/bid'
            },
            {
              label: 'History',// pageTwoID Parameter value will be add
              url: ''
            }
          ]
        }
      },
    ]
  },




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BidRoutingModule { }
