import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingService } from 'src/app/_services/loading.service';
import {delay} from 'rxjs/operators';


@Component({
  selector: 'app-add-sms',
  templateUrl: './add-sms.component.html',
  styleUrls: ['./add-sms.component.scss']
})
export class AddSmsComponent implements OnInit {

  smsForm:FormGroup;
  public loading:boolean=false;
  isSubmitted:boolean = false;
  constructor(private _loading:LoadingService) {
    this.smsForm=new FormGroup(
      {
        type:new FormControl("",[Validators.required]),
        subject:new FormControl("",[Validators.required]),
        message:new FormControl("",[Validators.required])
      }
    )

   }

  ngOnInit(): void {
    this.listenToLoading();
  }

  get smsFormControl()
  {
    return this.smsForm.controls;
  }

  listenToLoading(): void {
    this._loading.loadingSub
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading) => {
        this.loading = loading;
      });
  }
  addSms()
  {
      if(this.smsForm.invalid)
      {
        return;
      }
      console.log(this.smsForm.value);
  }
}
