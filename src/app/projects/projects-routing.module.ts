import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectsComponent } from './projects.component';
import { ListViewComponent } from './list-view/list-view.component';
import { AddViewComponent } from './add-view/add-view.component';
import { EditViewComponent } from './edit-view/edit-view.component';
import { UnitsComponent } from '../units/units.component';

const routes: Routes = [
 /*  {
    path: 'new',
    component: AddProjectComponent,
    data: {
      title: 'new',
      breadcrumb: [
        {
          label: 'page {{pageOneID}}',// pageOneID Parameter value will be add
          url: '/page1/:pageOneID'
        },
        {
          label: 'page {{pageTwoID}}',// pageTwoID Parameter value will be add
          url: ''
        }
      ]
    },
  },
  {
    path: 'edit/:id',
    data: {
      title: 'new',
      breadcrumb: [
        {
          label: 'page {{pageOneID}}',// pageOneID Parameter value will be add
          url: '/page1/:pageOneID'
        },
        {
          label: 'page {{pageTwoID}}',// pageTwoID Parameter value will be add
          url: ''
        }
      ]
    },
    component: AddProjectComponent,
    loadChildren: () => import('./add-project/add-project.module').then(m => m.AddProjectModule)
  } */
  {
    path: '', component: ProjectsComponent, children: [
      {
        path: '', component: ListViewComponent
      },
      {
        path: 'new', component: AddViewComponent,
        data: {
          title: 'new',
          breadcrumb: [
            {
              label: 'Projects',// pageOneID Parameter value will be add
              url: '/projects'
            },
            {
              label: 'New',// pageTwoID Parameter value will be add
              url: ''
            }
          ]
        },
      },
      {
        path: 'edit/:id/:project_name', component: EditViewComponent,
        data: {
          title: 'edit',
          breadcrumb: [
            {
              label: 'Projects',// pageOneID Parameter value will be add
              url: '/projects'
            },
            {
              label: '{{project_name}}',// pageTwoID Parameter value will be add
              url: ''
            }
          ]
        },
      },
      {
        path: 'units/:id/:project_name', component: UnitsComponent,
        loadChildren: () => import('../units/units.module').then(m => m.UnitsModule),
        data: {
          title: 'units',
          breadcrumb: [
            {
              label: 'Projects',// pageOneID Parameter value will be add
              url: '/projects'
            },
            {
              label: '{{project_name}}',// pageTwoID Parameter value will be add
              url: ''
            },
            {
              label: 'Units',// pageTwoID Parameter value will be add
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
export class ProjectsRoutingModule { }
