import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectsRoutingModule } from './projects-routing.module';
import { AddViewComponent } from './add-view/add-view.component';
import { ListViewComponent } from './list-view/list-view.component';
import { DataTablesModule } from 'angular-datatables';
import { EditViewComponent } from './edit-view/edit-view.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { SharedModule} from '../shared/shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { GoogleMapsComponent } from '../modals/google-maps/google-maps.component';
import {UnitsModule} from '../units/units.module'
import { from } from 'rxjs';
import { NgxLoadingModule } from 'ngx-loading';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ImageCropperComponent } from '../components/image-cropper/image-cropper.component';


@NgModule({
  declarations: [AddViewComponent, ListViewComponent, EditViewComponent, GoogleMapsComponent,ListViewComponent],
  imports: [

    SharedModule,
    ProjectsRoutingModule,
    FormsModule,

    ReactiveFormsModule,
    DataTablesModule,
    AccordionModule.forRoot(),
    ModalModule.forRoot(),
    PopoverModule.forRoot(),
    NgxLoadingModule.forRoot({})
  ]
})
export class ProjectsModule { }
