import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpResponse } from '@angular/common/http';

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  dtOptions: DataTables.Settings={};
  users: any = [];
  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {

    const that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
          that.http
              .get<DataTablesResponse>('http://184.72.176.212:8000/api/v1/dt/users/', dataTablesParameters)
              .subscribe(resp => {
                  that.users = resp['data'];

                  callback({
                      recordsTotal: resp['recordsTotal'],
                      recordsFiltered: resp['recordsFiltered'],
                      data: [],
                  });
              });
      },
      columns: [
          { data: "email" },
          { data: "mobile" },
          { data: "last_login" },
      ],
  };

  }
}
