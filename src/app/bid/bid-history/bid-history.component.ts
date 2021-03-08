import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {BidService} from 'src/app/_services/bid.service'
class BidHistorys {
  bidder_id:string;
  mobile: string;
  bid_amount: string;
  created_on:Date;
}

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}
@Component({
  selector: 'app-bid-history',
  templateUrl: './bid-history.component.html',
  styleUrls: ['./bid-history.component.scss']
})
export class BidHistoryComponent implements OnInit {

  dtOptions: DataTables.Settings={};
  bidHistorys: BidHistorys[];
  constructor(private http: HttpClient,private _service:BidService ){

  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        this._service.historyDatatable(dataTablesParameters).subscribe(resp => {
        this.bidHistorys = resp['data'];

                  callback({
                      recordsTotal: resp['recordsTotal'],
                      recordsFiltered: resp['recordsFiltered'],
                      data: [],
                  });
              });

      },
      columns: [
          { data: "user_name" },
          { data: "mobile" },
          { data: "bid_amount" },
          { data: "created_on" }
      ],
  };
  }

}
