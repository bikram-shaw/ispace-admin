import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookingComponent } from './booking.component';
import { ListViewComponent } from './list-view/list-view.component';

const routes: Routes = [
  {
    path: '',
    component: BookingComponent,
    children:[
      {
        path:'',
        component:ListViewComponent,

      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule { }
