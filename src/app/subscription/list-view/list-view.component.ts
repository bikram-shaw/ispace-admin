import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse, } from '@angular/common/http';
import {SubscriptionService} from 'src/app/_services/subscription.service'
class Subscription {
  plane_name:string;
  frequency: string;
  price:string;

}


@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {

  dtOptions: DataTables.Settings={};
  subs: Subscription[];
  constructor(private http: HttpClient,private _service: SubscriptionService) {

  }

  ngOnInit(): void {


    this.dtOptions = {
      pagingType: 'full_numbers',

      serverSide: true,
      processing: true,
      searching:false,
      ordering:false,
      paging:true,

      ajax: (dataTablesParameters: any, callback) => {
        this._service.subsDatatable(dataTablesParameters).subscribe(resp => {
        this.subs = resp['data'];

                  callback({
                      recordsTotal: resp['recordsTotal'],
                      recordsFiltered: resp['recordsFiltered'],
                      data: [],
                  });
              });

      },
      columns: [
          { data: "plan_name" },
          { data: "frequency" },
          { data: "price" },

      ],
  };

  }

}
