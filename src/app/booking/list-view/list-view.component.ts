import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {BookingService} from 'src/app/_services/booking.service'

class BookingHistorys {
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
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {
  dtOptions: DataTables.Settings={};
  bookingHistorys: BookingHistorys[];
  constructor(private http: HttpClient,private _service:BookingService ){

  }


  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        this._service.historyDatatable(dataTablesParameters).subscribe(resp => {
        this.bookingHistorys = resp['data'];

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
