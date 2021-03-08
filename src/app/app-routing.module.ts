import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login';
import { AuthGuard } from './_helpers';
import { ClientComponent } from './client/client.component';
import { ProjectsComponent } from './projects/projects.component';
import { UnitsComponent } from './units/units.component';
import { UsersComponent } from './users/users.component';
import { BidComponent } from './bid/bid.component';
import { BookingComponent } from './booking/booking.component';
import { SubscriptionComponent } from './subscription/subscription.component';



const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent , },


  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    data: { title: 'dashboard',
          breadcrumb:
          [
            {
              label: 'Dashboard',
              url: ''
            }
          ]
         },
  },
  {
    path: 'bid',
    component: BidComponent,
    canActivate: [AuthGuard],
    loadChildren: () => import('./bid/bid.module').then(m => m.BidModule),
    data: {
      title:'bid',
      breadcrumb: [
        {
          label: 'Bids',
          url: ''
        }
      ]
    }
  },
  {
    path: 'booking',
    component:BookingComponent,
    canActivate: [AuthGuard],

    loadChildren: () => import('./booking/booking.module').then(m => m.BookingModule),
    data: {
      title:'booking',

      breadcrumb: [
        {
          label:'Booking',
          url:''
        }

      ] },
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    canActivate: [AuthGuard],
    loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule),
    data: {
      title: 'projects',
      breadcrumb: [
        {
          label: 'Projects',
          url: ''
        }
      ]
    }
  },
  // {
  //   path: 'units',
  //   component: UnitsComponent,
  //   canActivate: [AuthGuard],
  //   loadChildren: () => import('./units/units.module').then(m => m.UnitsModule),
  //   data: {
  //     title: 'units',
  //     breadcrumb: [
  //       {
  //         label: 'Units',
  //         url: ''
  //       }
  //     ]
  //   }
  // },

  {
    path: 'units',
    component: UnitsComponent,
    canActivate: [AuthGuard],
    loadChildren: () => import('./units/units.module').then(m => m.UnitsModule),
    data: {
      title: 'units',
      breadcrumb: [
        {
          label: 'Units',
          url: ''
        }
      ]
    }
  },
  {
    path: 'users',
    component: UsersComponent,
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
    data: {
      title: 'users',
      breadcrumb: [
        {
          label: 'Users',
          url: ''
        }
      ]
    }
  },
  {
    path: 'subscription',
    component: SubscriptionComponent,
    canActivate: [AuthGuard],
    loadChildren: () => import('./subscription/subscription.module').then(m => m.SubscriptionModule),
    data: { title: 'subscription',
          breadcrumb:
          [
            {
              label: 'Subscription',
              url: ''
            }
          ]
         },
  },
  {
    path: 'notification',
    component: SubscriptionComponent,
    canActivate: [AuthGuard],
    loadChildren: () => import('./notification/notification.module').then(m => m.NotificationModule),
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
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
