import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingService } from 'src/app/_services/loading.service';
import {delay} from 'rxjs/operators';
import { SubscriptionService } from 'src/app/_services/subscription.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-view',
  templateUrl: './add-view.component.html',
  styleUrls: ['./add-view.component.scss']
})
export class AddViewComponent implements OnInit {
  AddSubsForm:FormGroup;
  isSubmitted:boolean=false;
  features:any;
  loading:boolean=false;
  constructor( private router: Router, private _loading:LoadingService,   private _service: SubscriptionService, private toastr: ToastrService,) {

  this.AddSubsForm=new FormGroup(
    {
      plan_name:new FormControl('',[Validators.required]),
      no_of_bid:new FormControl('',[Validators.required]),
      no_of_book:new FormControl('',[Validators.required]),
      frequency:new FormControl('',[Validators.required]),
      price:new FormControl('',[Validators.required]),
      status:new FormControl('',[Validators.required]),
      features:new FormArray([])
    }
  )
  this.features=this.AddSubsForm.get('features') as FormArray;
}

  createFeatureItem()
  {

    return  new FormGroup(
      {
        name: new FormControl(''),
      }
    );
  }

  ngOnInit(): void {
     //Assign Loading
     this.listenToLoading();

    this.addFeature();
  }
  // FormControl
  get AddSubsFormControl()
  {
    return this.AddSubsForm.controls;
  }

  // Choose Unit Status using select dropdown
  changeSubStatus(e) {
    console.log(e.target.value)
    this.AddSubsFormControl.status.setValue(e.target.value, {
      onlySelf: true
    })
  }
   // Choose Frequency using select dropdown
   changeFrequency(e) {
    console.log(e.target.value)
    this.AddSubsFormControl.frequency.setValue(e.target.value, {
      onlySelf: true
    })
  }
  // Choose Frequency using select dropdown
  changePlan(e) {
    console.log(e.target.value)
    this.AddSubsFormControl.plan_name.setValue(e.target.value, {
      onlySelf: true
    })
  }

  addFeature()
  {
    this.features.push(this.createFeatureItem());

   console.log(this.features.value)
    return true;
  }
  removeFeature(index)
  {
    if(this.features.length==1)
    {
      alert("Can't be Deleted When There is one Features");
      return false;
    }
    else{
      this.features.removeAt(index);
      console.log(this.features)
      alert("Feature is Successfully Deleted");
      return true;
    }

  }
  listenToLoading(): void {
    this._loading.loadingSub
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading) => {
        this.loading = loading;
      });
  }

  add()
  {
    this.isSubmitted = true;
    if(this.AddSubsForm.invalid)
    {
      console.log(this.AddSubsForm)
      return;
    }
    let formData=new FormData();
    formData.append("plan_name",this.AddSubsForm.value.plan_name);
    formData.append("no_of_bid",this.AddSubsForm.value.no_of_bid);
    formData.append("no_of_book",this.AddSubsForm.value.no_of_book);
    if(this.AddSubsForm.value.status=='Active')
    {
      formData.append("plan_status","True");
    }
    else{
      formData.append("Plan_status","False");
    }

    formData.append("Plan_amount",this.AddSubsForm.value.price);
    formData.append("Plan_frequency",this.AddSubsForm.value.frequency);
    var description="";
    for(var i=0;i<this.features.length;i++)
    {
      description+=this.AddSubsForm.value.features[i].name+"<br/>";
    }
    formData.append("plan_description",description);
     this._service.add(formData).subscribe(
       data=>
       {
         console.log(data);
         this.toastr.success('Plan Added Successfully', 'Success!');
         this.isSubmitted = false;
         this.router.navigate(['/subscription'])
       },
       error=>
       {
        console.log(error);
        this.toastr.error(error, 'Error', {
          timeOut: 3000,
        });
        this.isSubmitted = false;
       }
       );

  }
}
