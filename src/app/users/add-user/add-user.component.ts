import { Component, OnInit } from '@angular/core';
import { FormControlName, FormGroup, Validators,FormControl } from '@angular/forms';
import {delay} from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from 'src/app/_services/loading.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/_services';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  addUserForm:FormGroup;
  isSubmitted:boolean= false;
  loading:boolean=false;
  constructor(private router: Router, private _loading:LoadingService,private _service:UserService,private toastr: ToastrService,) {
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

  ngOnInit(): void {
    this.listenToLoading();
  }
  addUser()
  {
    if(this.addUserForm.invalid)
    {
      return;
    }
    console.log(this.addUserForm.value)
    //call add_user observable  from user service page
    this._service.addUsers(this.addUserForm.value).subscribe(
      data=>
      {
        console.log(data);
        this.toastr.success('Plan Added Successfully', 'Success!');
        this.isSubmitted = false;
        //this.router.navigate(['/subscription'])
      },
      error=>
      {
        console.log(error);
        this.toastr.error(error, 'Error', {
          timeOut: 3000,
        });
        this.isSubmitted = false;
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
  get addUserFormControl()
  {
    return this.addUserForm.controls;
  }
}
