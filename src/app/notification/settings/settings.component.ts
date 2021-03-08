import { Component, OnInit } from '@angular/core';
import {delay} from 'rxjs/operators';
import { LoadingService } from 'src/app/_services/loading.service';
import {NotificationService} from 'src/app/_services/notification.service'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
   settings:any;
   public loading:boolean =false;
  constructor( private _loading:LoadingService,private notification_service:NotificationService) { }

  // settings=
  // [
  //   {
  //     type:"Welcome",
  //     email:false,
  //     sms:false,
  //     pn:false
  //   },
  //   {
  //   type:"Signup OTP",
  //   email:false,
  //   sms:false,
  //   pn:false
  //   },

  //   {
  //     type:"Forget Password OTP",
  //     email:false,
  //     sms:false,
  //     pn:false
  //     },
  //     {
  //       type:"Booking Confirmation",
  //       email:false,
  //       sms:false,
  //       pn:false
  //     },
  //       {
  //         type:"Change Bid Confirmation",
  //         email:false,
  //         sms:false,
  //         pn:false
  //       },
  //       {
  //         type:"Place Bid Confirmation",
  //         email:false,
  //         sms:false,
  //         pn:false
  //       },
  //       {
  //         type:"Add Subscription",
  //         email:false,
  //         sms:false,
  //         pn:false
  //       },
  //       {
  //         type:"Payment Confirmation",
  //         email:false,
  //         sms:false,
  //         pn:false
  //       },
  //       {
  //         type:"Expire Subscription",
  //         email:false,
  //         sms:false,
  //         pn:false
  //       },

  // ]

  ngOnInit(): void {
    this.listenToLoading();
    this.getSettings();
  }

  getSettings()
  {
    this.notification_service.getSettings().subscribe(
      data=>{
          this.settings=data.results;
          console.log(this.settings)
      },
      error=>
      {
        console.log(error);
      }
    )
    console.log(this.settings);
  }

  updateSettings()
  {
    this.notification_service.updateSettings(this.settings).subscribe(
      data=>
      {
        console.log(data)
      },
      error=>
      {
        console.log(error);

      }
    )
  }

  listenToLoading(): void {
    this._loading.loadingSub
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading) => {
        this.loading = loading;
      });
  }
}
