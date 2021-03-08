import { Component, OnInit,TemplateRef,ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { ProjectService } from 'src/app/_services/project.service';
import { ToastrService } from 'ngx-toastr';
import { FileUploader, FileLikeObject, FileDropDirective, FileSelectDirective,  } from 'ng2-file-upload';
import {delay} from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { LoadingService } from 'src/app/_services/loading.service';
import { ngxLoadingAnimationTypes, NgxLoadingComponent } from  'ngx-loading';
import { ImageCropperComponent } from 'src/app/components/image-cropper/image-cropper.component';
import { GoogleMapsComponent } from 'src/app/modals/google-maps/google-maps.component';

declare var google;

declare var $:any;
@Component({
  selector: 'app-edit-view',
  templateUrl: './edit-view.component.html',
  styleUrls: ['./edit-view.component.scss']
})
export class EditViewComponent implements OnInit {
  id: any = "";
  project_name: any = "";
  loading = false;
  isSubmitted = false;
  accordion: any = [
    { id: 1, isOpen: true },
    { id: 2, isOpen: false },
    { id: 3, isOpen: false },
  ];
  editProjectForm: FormGroup;
  public uploader: FileUploader;
  googleAutocomplete: any;
  public hasBaseDropZoneOver:boolean = false;
  response:string;
  lat: any;
  lng: any;

  public loadingTemplate: TemplateRef<any>;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;

  @ViewChild('autoCompleteInput', { static: false }) inputNativeElement: any;
  bsModalRef: BsModalRef;
  imgUrl=[];
  url=[];
  file:File;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _service: ProjectService,
    private toastr: ToastrService,
    private _loading:LoadingService,
    private modalService: BsModalService,
  ) {
    console.log(this.accordion);
    this.editProjectForm = new FormGroup(
      {
        //selectClient:new FormControl('',[Validators.required]),
        developer: new FormControl('', [Validators.required]),
        project_name: new FormControl('', [Validators.required]),
        address: new FormControl('', Validators.required),
        landmark:new FormControl(''),
        state: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        pin: new FormControl('', Validators.required),
        description:new FormControl(''),
        google_location:new FormControl('',Validators.required),
        mobile: new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
        mobile_alt: new FormControl('', [Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
        email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
        email_alt: new FormControl('', [Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
        contact_person: new FormControl('', Validators.required),
        contact_person_alt: new FormControl('', ),
        construction_status: new FormControl('', Validators.required),
        estimated_completion: new FormControl('', Validators.required),
        building_type: new FormControl('', Validators.required),
        storeys: new FormControl('', Validators.required),
        no_of_units: new FormControl('', Validators.required),
        parking: new FormControl('', Validators.required),
        architects: new FormControl(''),
        interior_designer: new FormControl(''),
        file: new FormControl('', ),
        fileSource: new FormControl('')

      }
    );

    // this.uploader = new FileUploader({
    //   disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
    //   formatDataFunctionIsAsync: true,
    //   formatDataFunction: async (item) => {
    //     return new Promise( (resolve, reject) => {
    //       resolve({
    //         name: item._file.name,
    //         length: item._file.size,
    //         contentType: item._file.type,
    //         date: new Date()
    //       });
    //     });
    //   }
    // });

    // this.hasBaseDropZoneOver = false;

    // this.response = '';

    // this.uploader.response.subscribe( res => this.response = res );
  }

  //pick images
 onChange(event) {

  var selectedImage=event.target.files[0];

   var reader = new FileReader();

   reader.onload = (event:any) => {
     this.imgUrl[0]=event.target.result;
     this.openImageCropperComponent();

   }

   reader.readAsDataURL(selectedImage);



}


  ngOnInit(): void {
    //Assign Loading
    this.listenToLoading();

    this.id="";
    this.route.params.subscribe(params => {
      if(params.id){
        this.id = params.id;
        this.project_name = params.project_name;
        this.getUser(this.id);
      }
    });

    this.addAutoComplete();
  }

  getUser(id): void {
    this._service.get(id)
      .subscribe(data => {
        console.log(data);
        this.editProjectForm.get('project_name').setValue(data.project_name);
        this.url.push(data.image);
        this.editProjectForm.get('developer').setValue(data.developer);
        this.editProjectForm.get('description').setValue(data.description);
        this.editProjectForm.get('address').setValue(data['project_address'].address);
        this.editProjectForm.get('landmark').setValue(data['project_address'].landmark);
        this.editProjectForm.get('state').setValue(data['project_address'].state);
        this.editProjectForm.get('city').setValue(data['project_address'].city);
        this.editProjectForm.get('pin').setValue(data['project_address'].pin);
        this.editProjectForm.get('google_location').setValue(data['project_address'].google_location);
        this.lat=data['project_address'].latitude;
        this.lng=data['project_address'].longitude;
        this.editProjectForm.get('mobile').setValue(data.mobile);
        this.editProjectForm.get('mobile_alt').setValue(data.mobile_alt);
        this.editProjectForm.get('email').setValue(data.email);
        this.editProjectForm.get('email_alt').setValue(data.email_alt);
        this.editProjectForm.get('contact_person').setValue(data.contact_person);
        this.editProjectForm.get('contact_person_alt').setValue(data.contact_person_alt);
        this.editProjectForm.get('construction_status').setValue(data.construction_status);
        this.editProjectForm.get('estimated_completion').setValue(data.estimated_completion);
        this.editProjectForm.get('building_type').setValue(data.building_type);
        this.editProjectForm.get('storeys').setValue(data.storeys);
        this.editProjectForm.get('no_of_units').setValue(data.no_of_units);
        this.editProjectForm.get('parking').setValue(data.parking);
        this.editProjectForm.get('architects').setValue(data.architects);
        this.editProjectForm.get('interior_designer').setValue(data.interior_designer);
      });
  }


  //addClientFormControl

  get editProjectFormControl() {
    return this.editProjectForm.controls;
  }
  // Choose Client using select dropdown
  changeClient(e) {
    console.log(e.value)
    this.editProjectFormControl.selectClient.setValue(e.target.value, {
      onlySelf: true
    })
  }
   // Choose city using select dropdown
  changeCity(e) {
    console.log(e.value)
    this.editProjectFormControl.city.setValue(e.target.value, {
      onlySelf: true
    })
  }
   // Choose State using select dropdown
  changeState(e) {
    console.log(e.value)
    this.editProjectFormControl.state.setValue(e.target.value, {
      onlySelf: true
    })
  }

  listenToLoading(): void {
    this._loading.loadingSub
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading) => {
        this.loading = loading;
      });
  }


  save(){
    this.isSubmitted = true;
    if (this.editProjectForm.invalid) {
      return;
    }
    console.log(this.editProjectForm.value)
    let formData = new FormData();
    //let files = this.getFiles();
    //console.log(files);
    console.log(this.file)
    if(this.file!=null)
    {
      formData.append('image', this.file);
    }

    let project_data = {
      developer: this.editProjectForm.value.developer,
      project_name: this.editProjectForm.value.project_name,
      description:this.editProjectForm.value.project_name,
      mobile: this.editProjectForm.value.mobile,
      mobile_alt: this.editProjectForm.value.mobile_alt,
      email: this.editProjectForm.value.email,
      email_alt: this.editProjectForm.value.email_alt,
      contact_person: this.editProjectForm.value.contact_person,
      contact_person_alt: this.editProjectForm.value.contact_person_alt,
      construction_status: this.editProjectForm.value.construction_status,
      estimated_completion: this.editProjectForm.value.estimated_completion,
      building_type: this.editProjectForm.value.building_type,
      storeys: this.editProjectForm.value.storeys,
      no_of_units: this.editProjectForm.value.no_of_units,
      parking: this.editProjectForm.value.parking,
      architects: this.editProjectForm.value.architects,
      interior_designer: this.editProjectForm.value.interior_designer,
      project_address: {
        address: this.editProjectForm.value.address,
        landmark:this.editProjectForm.value.landmark,
        state: this.editProjectForm.value.state,
        city: this.editProjectForm.value.city,
        pin: this.editProjectForm.value.pin,
        google_location: this.editProjectForm.value.google_location,
        latitude: this.lat,
        longitude: this.lng
      }

    }
    for(let dataKey in project_data) {
      if(dataKey === 'project_address') {
        // append nested object
        for (let previewKey in project_data[dataKey]) {
          formData.append(`project_address.${previewKey}`, project_data[dataKey][previewKey]);
        }
      }
      else {
        formData.append(dataKey, project_data[dataKey]);
      }
    }
    console.log(formData);
    this._service.edit(this.id, formData)
      .subscribe(data => {
        console.log(data);
        this.isSubmitted = false;
        this.toastr.success('Saved Successfully', 'Success!');
        this.router.navigate(['/projects']);

      },
        error => {
          console.log(error);
          this.toastr.error(error, 'Error', {
            timeOut: 3000,
          });
          this.isSubmitted = false;
        },
        () => {
        }
      );

  }

  toggle(id) {
    for (var i = 0; i < this.accordion.length; i++) {
      if (id == this.accordion[i].id) {
        this.accordion[i].isOpen = !this.accordion[i].isOpen;
      }
    }
    console.log(this.accordion);
  }

  get f(){
    return this.editProjectForm.controls;
  }

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  getFiles(): FileLikeObject[] {
    return this.uploader.queue.map((fileItem) => {
      return fileItem.file;

    });
  }


  addAutoComplete() {
    console.log("hello");
    //this.googleAutocomplete = new google.maps.places.Autocomplete(this.inputNativeElement.inputNativeElement);
    var nativeHomeInputBox = document.getElementById('placeName')

    //console.log(document.getElementById('placeName'));
    this.googleAutocomplete = new google.maps.places.Autocomplete(nativeHomeInputBox);
    this.googleAutocomplete.setFields(['address_components', 'geometry', 'icon', 'name', 'formatted_address']);
    this.googleAutocomplete.addListener('place_changed', () => {
     this.place_changed();
    });
  }

  place_changed(){
    const place = this.googleAutocomplete.getPlace();
    this.editProjectForm.get('google_location').setValue(place.formatted_address);

    /*let address = '';
    if (place.address_components) {
      address = [
        (place.address_components[0] && place.address_components[0].short_name || ''),
        (place.address_components[1] && place.address_components[1].short_name || ''),
        (place.address_components[2] && place.address_components[2].short_name || '')
      ].join(' ');
    }*/
    var zipCode = "";
     var addressComponent = place.address_components;
        for (var x = 0 ; x < addressComponent.length; x++) {
            var chk = addressComponent[x];
            if (chk.types[0] == 'postal_code') {
                zipCode = chk.long_name;
            }
        }
        console.log(zipCode);
        if (zipCode.trim()) {

          this.editProjectForm.get('pin').setValue(zipCode)

        }
    this.lat = place.geometry.location.lat();
    this.lng = place.geometry.location.lng();

    console.log(this.lat, this.lng);

  }
  openModalWithComponent() {

    const initialState = {
      lat:parseInt(this.lat),
      lng:parseInt(this.lng),
      title: 'Modal with component'
    };
    this.bsModalRef = this.modalService.show(
      GoogleMapsComponent,
      {initialState,class: 'modal-lg'},
     // Object.assign({}, { class: 'gray modal-lg' })
    );
    this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.content.event.subscribe(emmitedValue => {
      this.lat=emmitedValue[0].lat;
      this.lng=emmitedValue[0].lng;
      this.editProjectForm.get('google_location').setValue(emmitedValue[0].add);

      // do sth with emmitedValue
  });
  }

 async openImageCropperComponent()
  {


    const initialState = {

      imageSource:this.imgUrl,
      i_th_image:0


    };
    this.bsModalRef = this.modalService.show(
      ImageCropperComponent,
      {initialState, class: 'modal-lg'},

    );
    this.bsModalRef.content.closeBtnName = 'Close';

    this.bsModalRef.content.event.subscribe(emmitedValue => {
      this.file=emmitedValue[0];
      console.log(this.file);

      // do sth with emmitedValue
      var fileReader=new FileReader;
      fileReader.onload=(event:any)=>
     {
     this.url[0]=event.target.result;

     }
     fileReader.readAsDataURL(emmitedValue[0]);
  });
  }


}



