import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

class Person {
  name:string;
  email: string;
  mobile: string;
  cd:string;
}

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})

export class ClientComponent implements OnInit {
  dtOptions: DataTables.Settings={};
  persons: Person[];
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
              .post<DataTablesResponse>('http://localhost/ispace-admin/clients.php', dataTablesParameters, {})
              .subscribe(resp => {
                  that.persons = resp.data;

                  callback({
                      recordsTotal: resp.recordsTotal,
                      recordsFiltered: resp.recordsFiltered,
                      data: [],
                  });
              });
      },
      columns: [
          { data: "name" },
          { data: "email" },
          { data: "mobile" },
          { data: "cd" }
      ],
  };

  }

}



