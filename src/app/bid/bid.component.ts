import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse, } from '@angular/common/http';
import {BidService} from '../_services/bid.service'
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
  selector: 'app-bid',
  templateUrl: './bid.component.html',
  styleUrls: ['./bid.component.scss']
})
export class BidComponent implements OnInit {

  dtOptions: DataTables.Settings={};
  bids: Bids[];
  constructor(private http: HttpClient,private _service: BidService) {

  }

  ngOnInit(): void {



  }
}
