import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse, } from '@angular/common/http';
import {BidService} from 'src/app/_services/bid.service'
class Bids {
  unit_name:string;
  project_name: string;
  bid_amount:string;
  created_on:string;
  user_name:String
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
  bids: Bids[];
  constructor(private http: HttpClient,private _service: BidService) {

  }

  ngOnInit(): void {


    this.dtOptions = {
      pagingType: 'full_numbers',

      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        this._service.bidDatatable(dataTablesParameters).subscribe(resp => {
        this.bids = resp['data'];

                  callback({
                      recordsTotal: resp['recordsTotal'],
                      recordsFiltered: resp['recordsFiltered'],
                      data: [],
                  });
              });

      },
      columns: [
          { data: "unit_name" },
          { data: "project_name" },
          { data: "bid_amount" },
          { data: "created_on" },
          {data :"user_name"}
      ],
  };

  }
}
