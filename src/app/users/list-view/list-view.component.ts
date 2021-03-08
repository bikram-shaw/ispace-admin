import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {UserService} from 'src/app/_services/user.service'


class User {

  user_type:String;
  profile:any;
  email: string;
  id:any

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


  dtOptions: DataTables.Settings={};
  users: User[];
  constructor(private http: HttpClient,private _service:UserService ){

  }



  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      serverSide: true,
      processing: true,
      ajax: (DataTables:any, callback) => {
        this._service.datatable(DataTables).subscribe(resp => {
                  this.users = resp['data'];
                  console.log(resp['data'])
                  callback({
                      recordsTotal: resp['recordsTotal'],
                      recordsFiltered: resp['recordsFiltered'],
                      data: [],
                  });
              });
      },

      columns: [

          { data: "user_type" },
           {data:"profile"},
          { data: "email" },
          {data:"id"}
      ],
  };

  }

}
