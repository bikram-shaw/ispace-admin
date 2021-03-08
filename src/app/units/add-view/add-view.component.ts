import { Component, OnInit,TemplateRef,ViewChild,ElementRef } from '@angular/core';
import {FormControl,FormGroup,Validators,FormArray,FormBuilder} from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { UnitService } from 'src/app/_services/unit.service';
import {ProjectService} from 'src/app/_services/project.service'
import { ActivatedRoute,Router } from '@angular/router';
import {Rooms} from 'src/app/_models/rooms'
import { map } from 'jquery';
import { ngxLoadingAnimationTypes, NgxLoadingComponent } from  'ngx-loading';
import {delay} from 'rxjs/operators';
import { LoadingService } from 'src/app/_services/loading.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ImageCropperComponent } from 'src/app/components/image-cropper/image-cropper.component';





@Component({
  selector: 'app-add-view',
  templateUrl: './add-view.component.html',
  styleUrls: ['./add-view.component.scss']
})


export class AddViewComponent implements OnInit {

  addUnitForm: FormGroup;
  accordion: any = [
    { id: 1, isOpen: true },
    { id: 2, isOpen: false },
    { id: 3, isOpen: false },
  ];
  public loadingTemplate: TemplateRef<any>;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading:boolean =false;


  myFiles = [];
  public searchProjectResult: Array<any> = [];
  isSubmitted:boolean = false;
  unit_room:any
  id: any = "";
  fileInputTouched:boolean=false;
  bsModalRef: BsModalRef;
  urls=[];
  cropedImgUrls=[];

  @ViewChild('imageip', {static: false}) myInput: ElementRef;

  constructor(
    private fb:FormBuilder,
    private route: ActivatedRoute,
    private _service: UnitService,
    private toastr:ToastrService,
    private project_service:ProjectService,
    private _loading:LoadingService,
    private router: Router,
    private modalService: BsModalService,

  ) {
    this.addUnitForm=new FormGroup(
      {
        project:new FormControl(''),
        project_name:new FormControl('',[Validators.required]),
        unit_name:new FormControl('',[Validators.required]),
        description:new FormControl('',Validators.required),
        status:new FormControl('',[Validators.required]),
        unit_type:new FormControl('',[Validators.required]),
        total_area:new FormControl('',Validators.required),
        unit_at:new FormControl('',Validators.required),
        parking_type:new FormControl('',Validators.required),
        exposure:new FormControl('',Validators.required),
        outdoor_space:new FormControl('',Validators.required),
        balcony_view:new FormControl('',Validators.required),
        parking:new FormControl('',Validators.required),
        carpet_area:new FormControl('',Validators.required),
        price_per_sq_ft:new FormControl('',Validators.required),
        booking_price:new FormControl('',Validators.required),
        bid_start_date:new FormControl('',Validators.required),
        bid_end_date:new FormControl('',Validators.required),
        min_bid_price:new FormControl('',Validators.required),
        bid_step:new FormControl('',Validators.required),
       // unit_image:this.fb.array([]),
        unit_room:new FormArray([
        ])
      },


    );

    this.unit_room=this.addUnitForm.get('unit_room')  as FormArray;
  }
//Help to get all photos controls as form array.
// get unit_image(): FormArray {
//   return this.addUnitForm.get('unit_image') as FormArray;
// };
// We will create multiple form controls inside defined form controls photos.
// createImageItem(data): FormGroup {
//   return this.fb.group(data);
// }

createRoomItem()
{
  var room;
   return room = new FormGroup({
    name: new FormControl(''),
    size: new FormControl(''),
    features:new FormControl('')
  });
}

  ngOnInit(): void {
    //Assign Loading
    this.listenToLoading();

   this.unit_room.push(this.createRoomItem());
  //  get the project List
  this.getProjectList();

  }

   makeFileInputTouched()
   {
     // Making file input touched
     this.fileInputTouched=true;
   }

   onChange(event) {
      let files=event.target.files;

      //validate File Size
      for(var i=0;i<files.length;i++)
     {
       if(files[i].size>512000)
       {
        this.toastr.error("File Size Can not be Exceeded from 500kb");
        return;
       }
     }
     //validate no. of File
      if(files.length+this.urls.length>5)
      {
        this.toastr.error("Maximum 5 Files Should be Selected");
        return;
      }
      document.getElementById("noOfFile").innerText=(files.length+this.urls.length).toString()+" Files Selected";
       if (event.target.files && event.target.files[0]) {

         for ( let i=0; i<files.length ;i++ ) {

                var reader = new FileReader();
                 reader.onload =  (event:any) => {
                   //this.urls=event.target.result;
                   this.urls.push(event.target.result);

                   this.myFiles.push({"file":files[i],isChecked:false})
                 // callBack(event.target.result,i);
                   //console.log(event.target.result);
                 //    this.unit_image.push(this.createImageItem({
                 //     file,
                 //     url:event.target.result



                 // })
                 //    );


                 }

                 reader.readAsDataURL(files[i]);

              }

   }

    //await this.cropImage()
  }

  // onChange(event)
  // {
  //      this.cropImage(event,()=>
  //      {

  //        for(let i=0;i<this.urls.length;i++)
  //        {
  //           this.openImageCropperComponent(i);
  //        }
  //      });


  // }




  removeImage(i)
  {
    //this.unit_image.removeAt(i);
    this.urls.splice(i,1);
    this.myFiles.splice(i,1);
    document.getElementById("noOfFile").innerText=this.urls.length.toString()+" Files Selected";

  }
  selectPrimaryImage(index,event)
  {

   for(let i=0;i<this.myFiles.length;i++)
   {
      if(i==index)
      {
        this.myFiles[i].isChecked=true;
      }
      else{
        this.myFiles[i].isChecked=false;
      }

   }

  }

  addRow() {


   this.unit_room.push(this.createRoomItem());
   console.log(this.unit_room.value)
    return true;
}



deleteRow(index) {
    if(this.unit_room.length ==1) {
      alert("Can't delete the row when there is only one row");
        return false;
    } else {
        this.unit_room.removeAt(index);
       alert('Row deleted successfully');
        return true;
    }
}


toggle(id) {
  for (var i = 0; i < this.accordion.length; i++) {
    if (id == this.accordion[i].id) {
      this.accordion[i].isOpen = !this.accordion[i].isOpen;
    }
  }
 // console.log(this.accordion);
}




//addClientFormControl

get addUnitFormControl() {
  return this.addUnitForm.controls;
}



  // Choose Unit Status using select dropdown
  changeUnitStatus(e) {
    console.log(e.target.value)
    this.addUnitFormControl.status.setValue(e.target.value, {
      onlySelf: true
    })
  }
 // Choose Unit Status using select dropdown
 changeProjectName(e) {
  console.log(e.target.value)
  this.addUnitFormControl.project_name.setValue(e.target.value, {
    onlySelf: true
  })
  var i=0;
  while(true)
  {

    if(this.searchProjectResult[i].project_name==e.target.value)
    {
      console.log(this.searchProjectResult[i].id)
      this.addUnitFormControl.project.setValue( this.searchProjectResult[i].id,{onlySelf:true})
      break;
    }
    i++;
  }


}


listenToLoading(): void {
  this._loading.loadingSub
    .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
    .subscribe((loading) => {
      this.loading = loading;
    });
}

  saveData(){

    this.isSubmitted = true;

      if(this.addUnitForm.invalid)
      {
        console.log(this.isSubmitted)
        console.log(this.addUnitForm)
        return;
      }
      let formData=new FormData()
      formData.append("project",JSON.stringify(this.addUnitForm.value))
      for(var i=0;i<this.myFiles.length;i++)
      {

        formData.append("unit_image",this.myFiles[i].file);
        formData.append("isPrimary",JSON.stringify(this.myFiles[i].isChecked));

      }

    this._service.add(formData)
      .subscribe(data => {
        this.toastr.success('saved Successfully', 'Success!');
         console.log(data);
         this.isSubmitted=false;
         this.router.navigate(['/units']);
      },
      error => {
        console.log(error);
        this.toastr.error(error, 'Error', {
          timeOut: 3000,
        });
        this.isSubmitted = false;
      },
      );

    console.log(formData)

  }

  edit(){
    this._service.edit(this.id, this.addUnitForm.value)
      .subscribe(data => {
        alert("Unit Saved");

      });

  }

getProjectList()
{

   this.project_service.list().subscribe(
     data=>
     {
      this.searchProjectResult=data["results"];
     }
     ,error=>
     {
      console.log(error);
     }
   )
  //console.log(this.searchProjectResult);
}

openImageCropperComponent(i)
{

  const initialState = {
    imageSource:this.urls,
    i_th_image:i
  };
  this.bsModalRef = this.modalService.show(
    ImageCropperComponent,
    {initialState, class: 'modal-lg'},

  );
  this.bsModalRef.content.closeBtnName = 'Close';

  this.bsModalRef.content.event.subscribe(emmitedValue => {
    console.log(emmitedValue);
    if(this.myFiles[i].isChecked==true)
       this.myFiles[i]={"file":emmitedValue[0],isChecked:true}
    else
    this.myFiles[i]={"file":emmitedValue[0],isChecked:false}
   var fileReader=new FileReader;
   fileReader.onload=(event:any)=>
   {
     this.urls[i]=event.target.result;

   }
   fileReader.readAsDataURL(emmitedValue[0]);
});
}


}
