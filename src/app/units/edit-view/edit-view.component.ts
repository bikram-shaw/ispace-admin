import { Component, OnInit,TemplateRef } from '@angular/core';
import {FormControl,FormGroup,Validators,FormArray,FormBuilder} from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { UnitService } from 'src/app/_services/unit.service';
import {ProjectService} from 'src/app/_services/project.service'
import { ActivatedRoute,Router } from '@angular/router';
import {Rooms} from 'src/app/_models/rooms'
import { data, map } from 'jquery';
import { ngxLoadingAnimationTypes, NgxLoadingComponent } from  'ngx-loading';

import { LoadingService } from 'src/app/_services/loading.service';
import {delay} from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ImageCropperComponent } from 'src/app/components/image-cropper/image-cropper.component';


@Component({
  selector: 'app-edit-view',
  templateUrl: './edit-view.component.html',
  styleUrls: ['./edit-view.component.scss']
})
export class EditViewComponent implements OnInit {

  addUnitForm: FormGroup;
  accordion: any = [
    { id: 1, isOpen: true },
    { id: 2, isOpen: false },
    { id: 3, isOpen: false },
  ];
  public loadingTemplate: TemplateRef<any>;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading:boolean =false;


  urls=[];
  myFiles = [];
   searchProjectResult: any;
  isSubmitted:boolean = false;
  unit_room:any
  id: any = "";
  bsModalRef: BsModalRef;
  fileInputTouched:boolean=false;
  images=[];
  isPrimariy=[];
  constructor(
    private fb:FormBuilder,
    private route: ActivatedRoute,
    private _service: UnitService,
    private toastr:ToastrService,
    private project_service:ProjectService,
    private _loading:LoadingService,
    private router:Router,
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

    this.id="";
    this.route.params.subscribe(params => {
      if(params.id){
        this.id = params.id;
        this.getUser(this.id);
      }
    });
  //  get the project List
  this.getProjectList();

  }

   makeFileInputTouched()
   {
     // Making file input touched
     this.fileInputTouched=true;
   }
  //pick images
  onChange(event) {

  let files=event.target.files;
  //validate File Size
  for(var i=0;i<files.length;i++)
  {
    if(files[i].size>512000)
    {
     this.toastr.error("File Size Can  be Exceeded from 500kb");
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

      for (let  i=0; i<files.length ;i++ ) {
              var reader = new FileReader();
             // this.myFiles.push(files[i]);

              reader.onload = (event:any) => {
                this.urls.push(event.target.result);
                this.myFiles.push({"file":files[i],isChecked:false})
                this.isPrimariy.push(false);
                //console.log(event.target.result);
              //    this.unit_image.push(this.createImageItem({
              //     file,
              //     url:event.target.result



              // })
              //    );


              }

              reader.readAsDataURL(files[i]);

      }
      //console.log(this.myFiles)


}
  }

  getUser(id): void {
    this._service.get(id)
      .subscribe(data => {
        console.log(data);
        this.addUnitForm.get('project_name').setValue(data.project_name);
        this.addUnitForm.get('project').setValue(data.project);
        this.addUnitForm.get('unit_name').setValue(data.unit_name);
        this.images=data.unit_image.map(image=>image);
        this.isPrimariy=data.unit_image.map(image=>image.is_primary);
        console.log(this.isPrimariy);
        this.addUnitForm.get('description').setValue(data.description);
        this.addUnitForm.get('status').setValue(data.status);
        this.addUnitForm.get('unit_type').setValue(data.unit_type);
        this.addUnitForm.get('bid_step').setValue(data.bid_step);
        this.addUnitForm.get('min_bid_price').setValue(data.min_bid_price);
        this.addUnitForm.get('bid_end_date').setValue(data.bid_end_date);
        this.addUnitForm.get('bid_start_date').setValue(data.bid_start_date);
        this.addUnitForm.get('booking_price').setValue(data.booking_price);
        this.addUnitForm.get('carpet_area').setValue(data.carpet_area);
        this.addUnitForm.get('price_per_sq_ft').setValue(data.price_per_sq_ft);
        this.addUnitForm.get('parking').setValue(data.parking);
        this.addUnitForm.get('balcony_view').setValue(data.balcony_view);
        this.addUnitForm.get('outdoor_space').setValue(data.outdoor_space);
        this.addUnitForm.get('exposure').setValue(data.exposure);
        this.addUnitForm.get('parking_type').setValue(data.parking_type);
        this.addUnitForm.get('unit_at').setValue(data.unit_at);
        this.addUnitForm.get('total_area').setValue(data.total_area);
        console.log(data.unit_room);
        data.unit_room.forEach(element => {
          this.unit_room.push(
             this.fb.group(
               {
                name: [element.name, Validators.required],
                size: [element.size, Validators.required],
                features: [element.features, Validators.required]
               }
             )
          )
        });


       console.log(this.unit_room)


      });

  }

  removeImageFromCurrentPickedImages(i)
  {
    console.log(i)
    //this.unit_image.removeAt(i);
    this.urls.splice(i,1);
    this.myFiles.splice(i,1);
    console.log(this.myFiles)
    document.getElementById("noOfFile").innerText=this.urls.length.toString()+" Files Selected";
  }
  removeImageFromExistingUnitImagesInServer(i,id)
  {

    this._service.removeImage(id).subscribe(
      data=>
      {
        this.images.splice(i,1);
        console.log(data);
      },
      error=>
      {
        console.log(error);
      }
    )
  }

  selectPrimaryImage(index,event)
  {

   for(let i=0;i<this.isPrimariy.length;i++)
   {
      if(i==index)
      {
        this.isPrimariy[i]=true;
      }
      else{
        this.isPrimariy[i]=false;
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

  collectData(){

    if(this.id){
      this.edit();
      this.isSubmitted = false;
    }
    else{
      //this.add();

    }
  }

  saveData(){

    this.isSubmitted = true;
    // this.loading=true;
      if(this.addUnitForm.invalid)
      {
        console.log(this.isSubmitted)
        console.log(this.addUnitForm)
        return;
      }

    // let formData=new FormData();
    // formData.append("project",this.addUnitForm.value.project);
    // formData.append("project_name",this.addUnitForm.value.project_name);
    // formData.append("unit_name",this.addUnitForm.value.unit_name);
    // formData.append("description",this.addUnitForm.value.description);
    // formData.append("status",this.addUnitForm.value.status);
    // formData.append("unit_type",this.addUnitForm.value.unit_type);
    // formData.append("bid_step",this.addUnitForm.value.bid_step);
    // formData.append("min_bid_price",this.addUnitForm.value.min_bid_price);
    // formData.append("bid_end_date",this.addUnitForm.value.bid_end_date);
    // formData.append("bid_start_date",this.addUnitForm.value.bid_start_date);
    // formData.append("booking_price",this.addUnitForm.value.booking_price);
    // formData.append("carpet_area",this.addUnitForm.value.carpet_area);
    // formData.append("price_per_sq_ft",this.addUnitForm.value.price_per_sq_ft);
    // formData.append("parking",this.addUnitForm.value.parking);
    // formData.append("balcony_view",this.addUnitForm.value.balcony_view);
    // formData.append("outdoor_space",this.addUnitForm.value.outdoor_space);
    // formData.append("exposure",this.addUnitForm.value.exposure);
    // formData.append("parking_type",this.addUnitForm.value.parking_type);
    // formData.append("unit_at",this.addUnitForm.value.unit_at);
    // formData.append("total_area",this.addUnitForm.value.total_area);


    // this.unit_room.getRawValue().forEach(e => {
    //   formData.append('unit_room[].name', e.name);
    //   formData.append('unit_room[].size', e.size);
    //   formData.append('unit_room[].features', e.features);
    // });

    // for(var i=0;i<this.myFiles.length;i++)
    // {

    //   formData.append("unit_image[].img",this.myFiles[i].file);
    //   formData.append("unit_image[].isPrimary",JSON.stringify(this.myFiles[i].isChecked));
    // }

      //formData.append("unit_image",JSON.stringify( this.addUnitForm.value.unit_image));

      let formData=new FormData()
      formData.append("project",JSON.stringify(this.addUnitForm.value))
      for(var i=0;i<this.myFiles.length;i++)
      {

        formData.append("unit_image",this.myFiles[i].file);
        //formData.append("isPrimary",JSON.stringify(this.isPrimariy[i]));

      }

      for(var i=0;i<this.isPrimariy.length;i++)
      {
        formData.append("isPrimary",JSON.stringify(this.isPrimariy[i]));
      }

    this._service.edit(this.id,formData)

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
