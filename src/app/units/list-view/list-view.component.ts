import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {UnitService } from '../../_services/unit.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/_services/project.service';
class Units {
  id:any;
  unit_name:string;
  project_name: string;
  status:string;
  bid_end_date:String;
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
  id:any;
  dtOptions: DataTables.Settings={};
  units: Units[];
  constructor(private router: ActivatedRoute, private _service: UnitService,private _pService:ProjectService) { }

  ngOnInit(): void {


    const that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {

        this.id="";
        this.router.params.subscribe(params => {
          if(params.id){

            this.id = params.id;
            this._pService.datatableUnits(dataTablesParameters,this.id).subscribe( resp=>
              {

                that.units = resp['data'];

                  callback({
                      recordsTotal: resp['recordsTotal'],
                      recordsFiltered: resp['recordsFiltered'],
                      data: [],
                  });
              });
          }

          else
          {

            this._service.datatable(dataTablesParameters).subscribe(resp => {
              that.units = resp['data'];

              callback({
                  recordsTotal: resp['recordsTotal'],
                  recordsFiltered: resp['recordsFiltered'],
                  data: [],
              });
          });
          }


        });




      },
      columns: [
          { data: "id" },
          { data: "unit_name" },
          //{ data: "deveoper_name" },
          { data: "project_name" },
          { data: "status" },
          { data: "bid_end_date" }
      ],
  };

  }
}
