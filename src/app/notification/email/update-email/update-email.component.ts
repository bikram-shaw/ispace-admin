import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import {LoadingService} from 'src/app/_services/loading.service'
import {delay} from 'rxjs/operators';
import {NotificationService} from 'src/app/_services/notification.service'
import { from } from 'rxjs';

@Component({
  selector: 'app-update-email',
  templateUrl: './update-email.component.html',
  styleUrls: ['./update-email.component.scss']
})
export class UpdateEmailComponent implements OnInit {

  emailForm:FormGroup;
  isSubmitted:boolean = false;
  public loading:boolean=false;
  init={
    height: 400,
    menubar: false,
    plugins: [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount',
      'a11ychecker advcode casechange formatpainter linkchecker autolink lists checklist media mediaembed pageembed permanentpen table advtable  tinymcespellchecker'
    ],
    toolbar:
      'undo redo | formatselect | fontselect | bold italic forecolor backcolor | \
      alignleft aligncenter alignright alignjustify | \
      a11ycheck addcomment showcomments casechange checklist code formatpainter pageembed permanentpen table | \
      bullist numlist outdent indent | removeformat '

  }
  constructor(private _loading:LoadingService,private _service:NotificationService) {
   this.emailForm=new FormGroup(
     {
       emailType:new FormControl('',[Validators.required]),
       emailSubject:new FormControl('',[Validators.required]),
       message:new FormControl('',[Validators.required])
     })
   }
  ngOnInit(): void {
    this.listenToLoading();
  }

  // Choose Email Type using select dropdown
  changeUnitStatus(e) {
    console.log(e.target.value)
    this.emailFormControl.emailType.setValue(e.target.value, {
      onlySelf: true
    })
    this.getEmail(e.target.value);
  }
  getEmail(type)
  {
    this._service.getEmail(type).subscribe(
      data=>
      {
        this.emailForm.get('emailSubject').setValue(data.email_subject);
        this.emailForm.get('message').setValue(data.message);
      },
      error=>
      {
        console.log(error);
      }
    )
    console.log(this.emailForm.value.emailType);
  }

  editEmail()
  {
     this.isSubmitted=true;
     if(this.emailForm.invalid)
     {
       return;

     }
     this._service.editEmail(this.emailForm.value.emailType,this.emailForm.value).subscribe(
       data=>
       {
         console.log(data);
       },
       error=>
       {
         console.log(error);
       }
     )
  }

  get emailFormControl()
  {
    return this.emailForm.controls;
  }

  listenToLoading(): void {
    this._loading.loadingSub
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading) => {
        this.loading = loading;
      });
  }
}
