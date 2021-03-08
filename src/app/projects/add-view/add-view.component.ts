import { Component, OnInit, ViewChild,TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { ProjectService } from 'src/app/_services/project.service';
import { ToastrService } from 'ngx-toastr';
import { FileUploader, FileLikeObject, FileDropDirective, FileSelectDirective,  } from 'ng2-file-upload';
import { ngxLoadingAnimationTypes, NgxLoadingComponent } from  'ngx-loading';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { GoogleMapsComponent } from 'src/app/modals/google-maps/google-maps.component';

import {delay} from 'rxjs/operators';
import { LoadingService } from 'src/app/_services/loading.service';
import { ImageCropperComponent } from 'src/app/components/image-cropper/image-cropper.component';


declare var google;

@Component({
  selector: 'app-add-view',
  templateUrl: './add-view.component.html',
  styleUrls: ['./add-view.component.scss']
})
export class AddViewComponent implements OnInit {
  loading:boolean = false;
  isSubmitted = false;
  accordion: any = [
    { id: 1, isOpen: true },
    { id: 2, isOpen: false },
    { id: 3, isOpen: false },
  ];

  addProjectForm: FormGroup;
  public uploader: FileUploader;
  public hasBaseDropZoneOver:boolean = false;
  response:string;
  lat: any;
  lng: any;
  directionForm: FormGroup;
  map: any;
  googleAutocomplete: any;
  geoCoder: any;
  public loadingTemplate: TemplateRef<any>;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  @ViewChild('autoCompleteInput', { static: false }) inputNativeElement: any;
  bsModalRef: BsModalRef;
  imgUrl=[];
  file:File;
  constructor(
    private modalService: BsModalService,
    private router: Router,
    private _service: ProjectService,
    private toastr: ToastrService,
    private _loading:LoadingService,
  ) {
    console.log(this.accordion);
    this.addProjectForm = new FormGroup(
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
        placeName:new FormControl('',Validators.required),
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
        file: new FormControl('',Validators.required),
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


  ngOnInit(): void {
    //Assign Loading
    this.listenToLoading();

    this.addAutoComplete();
  }

 //pick images
 onChange(event) {

             var selectedImage=event.target.files[0];

              var reader = new FileReader();

              reader.onload = (event:any) => {
                this.imgUrl.push( event.target.result);
                this.openImageCropperComponent();
              }

              reader.readAsDataURL(selectedImage);



  }

  //addClientFormControl

  get addProjectFormControl() {
    return this.addProjectForm.controls;
  }
  // Choose Client using select dropdown
  changeClient(e) {
    console.log(e.value)
    this.addProjectFormControl.selectClient.setValue(e.target.value, {
      onlySelf: true
    })
  }
  // Choose city using select dropdown
  changeCity(e) {
    console.log(e.value)
    this.addProjectFormControl.city.setValue(e.target.value, {
      onlySelf: true
    })
  }
  // Choose State using select dropdown
  changeState(e) {
    console.log(e.value)
    this.addProjectFormControl.state.setValue(e.target.value, {
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


  save() {
    this.isSubmitted = true;
    if (this.addProjectForm.invalid) {
      return;
    }


    let formData = new FormData();
    // let files = this.getFiles();
     //console.log(this.file);
    formData.append('image', this.file);
    let project_data = {
      developer: this.addProjectForm.value.developer,
      project_name: this.addProjectForm.value.project_name,
      description:this.addProjectForm.value.project_name,
      mobile: this.addProjectForm.value.mobile,
      mobile_alt: this.addProjectForm.value.mobile_alt,
      email: this.addProjectForm.value.email,
      email_alt: this.addProjectForm.value.email_alt,
      contact_person: this.addProjectForm.value.contact_person,
      contact_person_alt: this.addProjectForm.value.contact_person_alt,
      construction_status: this.addProjectForm.value.construction_status,
      estimated_completion: this.addProjectForm.value.estimated_completion,
      building_type: this.addProjectForm.value.building_type,
      storeys: this.addProjectForm.value.storeys,
      no_of_units: this.addProjectForm.value.no_of_units,
      parking: this.addProjectForm.value.parking,
      architects: this.addProjectForm.value.architects,
      interior_designer: this.addProjectForm.value.interior_designer,
      project_address: {
        address: this.addProjectForm.value.address,
        landmark:this.addProjectForm.value.landmark,
        state: this.addProjectForm.value.state,
        city: this.addProjectForm.value.city,
        pin: this.addProjectForm.value.pin,
        google_location: this.addProjectForm.value.placeName,
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
    formData.forEach((value,key) => {
      console.log(key+": "+value)
       });
       console.log(formData);
    this._service.add(formData)

      .subscribe(data => {
        console.log(data);
        this.isSubmitted = false;

        this.toastr.success('saved Successfully', 'Success!');
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
   // console.log(this.accordion);
  }

  get f(){
    return this.addProjectForm.controls;
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
    var nativeHomeInputBox = document.getElementById('placeName');
    this.googleAutocomplete = new google.maps.places.Autocomplete(nativeHomeInputBox);
    this.googleAutocomplete.setFields(['address_components', 'geometry', 'icon', 'name', 'formatted_address']);
    this.googleAutocomplete.addListener('place_changed', () => {
     this.place_changed();
    });
  }

  place_changed(){
    const place = this.googleAutocomplete.getPlace();
    this.addProjectForm.get('placeName').setValue(place.formatted_address);
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

          this.addProjectForm.get('pin').setValue(zipCode)

        }
    this.lat = place.geometry.location.lat();
    this.lng = place.geometry.location.lng();

    console.log(this.lat, this.lng);

  }

  openModalWithComponent() {

    const  initialState = {
      lat:this.lat,
      lng:this.lng,
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
      this.addProjectForm.get('placeName').setValue(emmitedValue[0].add);


      // do sth with emmitedValue
  });
  }
  openImageCropperComponent()
  {
    const initialState = {
      imageSource:this.imgUrl,
      i_th_image:this.imgUrl.length-1,

    };
    this.bsModalRef = this.modalService.show(
      ImageCropperComponent,
      {initialState, class: 'modal-lg'},

    );
    this.bsModalRef.content.closeBtnName = 'Close';

    this.bsModalRef.content.event.subscribe(emmitedValue => {
      this.file=emmitedValue[0];
      console.log(emmitedValue[0]);
      // do sth with emmitedValue
  });
  }


}
