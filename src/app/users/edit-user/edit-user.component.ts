import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { UserService } from 'src/app/_services';
import { LoadingService } from 'src/app/_services/loading.service';
import { Router, ActivatedRoute } from '@angular/router';
import {delay} from 'rxjs/operators';

class BidHistorys {
  unit_id:any;
  project_name: string;
  bid_amount: string;
  bid_placed_date:Date;
}

class BookingHistorys {
  unit_id:any;
  project_name: string;
  book_amount: string;
  book_placed_date:Date;
}

class TransactionHistorys {
  transaction_id:any;
  project_name: string;
  unit_name: string;
  amount: string;
  date:Date;
}

class Subscription {
  plan_name:string;
  start_date:Date;
  end_date:Date;
  amount: string;
  status:String;
}

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  dtOptions1: DataTables.Settings={};
  bidHistorys: BidHistorys[];
  dtOptions2: DataTables.Settings={};
  bookingHistorys: BookingHistorys [];
  dtOptions3: DataTables.Settings={};
  transactionHistorys: TransactionHistorys[];
  dtOptions4: DataTables.Settings={};
  subs: Subscription[];

  addUserForm:FormGroup;
  isSubmitted:boolean= false;
  loading:boolean=false;
  id:any;

  constructor(private _service:UserService,private router: Router, private _loading:LoadingService,private route: ActivatedRoute) {
    this.addUserForm=new FormGroup(
      {
        name:new FormControl('',[Validators.required]),
        address:new FormControl('',[Validators.required]),
        mobile:new FormControl('',[Validators.required]),
        email:new FormControl('',[Validators.required]),
        password:new FormControl('',[Validators.required])

      }
    )
   }

  accordion: any = [
    { id: 1, isOpen: true },
    { id: 2, isOpen: false },
    { id: 3, isOpen: false },
    { id: 4, isOpen: false },
    { id: 5, isOpen: false },
  ];

  ngOnInit(): void {
    this.listenToLoading();
    this.id="";
    this.route.params.subscribe(params => {
      if(params.id){
        this.id = params.id;
        this.getUserDetails(this.id);
      }
    });

    this.getBidHistory();
    this.getBookingHistory();
    this.getTransactionHistory();
    this.getSubscription();
  }


  toggle(id) {
    for (var i = 0; i < this.accordion.length; i++) {
      if (id == this.accordion[i].id) {
        this.accordion[i].isOpen = !this.accordion[i].isOpen;
      }
    }
   // console.log(this.accordion);
  }
  listenToLoading(): void {
    this._loading.loadingSub
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading) => {
        this.loading = loading;
      });
  }
  get addUserFormControl()
  {
    return this.addUserForm.controls;
  }
  updateUser()
  {
    if(this.addUserForm.invalid)
    {
      return;
    }
    console.log(this.addUserForm.value)
    //call add_user observable  from user service page
  }


  getUserDetails(id)
  {
    // get user details first and put value in adduserForm
  }
  getBidHistory()
  {

    this.dtOptions1 = {
      pagingType: 'full_numbers',
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        this._service.bidHistorydatatable(dataTablesParameters).subscribe(resp => {
        this.bidHistorys = resp['data'];

                  callback({
                      recordsTotal: resp['recordsTotal'],
                      recordsFiltered: resp['recordsFiltered'],
                      data: [],
                  });
              });

      },
      columns: [
          { data: "unit_id" },
          { data: "project_name" },
          { data: "bid_amount" },
          { data: "bid_amount" }

      ],
  };
  }

  getBookingHistory()
  {

    this.dtOptions2 = {
      pagingType: 'full_numbers',
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        this._service.bookingHistorydatatable(dataTablesParameters).subscribe(resp => {
        this.bidHistorys = resp['data'];

                  callback({
                      recordsTotal: resp['recordsTotal'],
                      recordsFiltered: resp['recordsFiltered'],
                      data: [],
                  });
              });

      },
      columns: [
          { data: "unit_id" },
          { data: "project_name" },
          { data: "book_amount" },
          { data: "book_placed_date" }

      ],
  };
  }
  getTransactionHistory()
  {

    this.dtOptions3 = {
      pagingType: 'full_numbers',
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        this._service.transactionHistorydatatable(dataTablesParameters).subscribe(resp => {
        this.bidHistorys = resp['data'];

                  callback({
                      recordsTotal: resp['recordsTotal'],
                      recordsFiltered: resp['recordsFiltered'],
                      data: [],
                  });
              });

      },
      columns: [
          { data: "transaction_id" },
          { data: "project_name" },
          { data: "unit_name" },
          { data: "amount" },
          { data: "date" }
      ],
  };
  }
  getSubscription()
  {

    this.dtOptions4 = {
      pagingType: 'full_numbers',
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        this._service.subscriptionHistorydatatable(dataTablesParameters).subscribe(resp => {
        this.bidHistorys = resp['data'];

                  callback({
                      recordsTotal: resp['recordsTotal'],
                      recordsFiltered: resp['recordsFiltered'],
                      data: [],
                  });
              });

      },
      columns: [
          { data: "plan_name" },
          { data: "start_date" },
          { data: "end_date" },
          { data: "amount" },
          { data: "status" }
      ],
  };
  }
}
