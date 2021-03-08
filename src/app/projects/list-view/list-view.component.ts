import { Component, OnInit,TemplateRef  } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../../_services/project.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from 'src/app/_services/loading.service';
import {delay} from 'rxjs/operators';

class Projects {
  id:any;


  pkid:any;
  project_name: string;
  developer: string;
  project_address: {
    address: string
    address_line2: null
    city: string
    country: null
    google_location: string
    id: string
    latitude: string
    longitude: null
    pin: string
    project:any
    state: string
  };
  mobile: string;
}
class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;

}
@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})

export class ListViewComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  projects: Projects[];
  modalRef: BsModalRef;
  publishProjectName:String;

  constructor( private _service: ProjectService,private modalService: BsModalService,private toastr: ToastrService) {}
  // Open View Model
  openModal(template: TemplateRef<any>,projectName) {
    this.publishProjectName=projectName;
    this.modalRef =   this.modalRef = this.modalService.show(template, {class: 'modal-md'});
  }

  ngOnInit() {


    this.dtOptions = {
      pagingType: 'full_numbers',
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        this._service.datatable(dataTablesParameters).subscribe(resp => {
          this.projects = resp['data'];
          console.log(resp['data'])
          callback({
            recordsTotal: resp['recordsTotal'],
            recordsFiltered: resp['recordsFiltered'],
            data: [],
          });
        });
      },
      columns: [
        {data:"id"},
        // {data:"pkid"},

        { data: "project_name" },
        { data: "developer" },
        { data: "project_address" },
        { data: "mobile" }
      ],
    };
  }

  confirmPublish()
  {

    this.modalRef.hide();
    this.toastr.success(this.publishProjectName+' is Successfully Published', 'Success!');
  }


  decline()
  {
    //alert("decline")
    this.modalRef.hide();
    // this.toastr.error('Error');
  }



}
