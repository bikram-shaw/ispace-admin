import { Component, OnInit,ElementRef,ViewChild,ViewChildren,Output,EventEmitter,SimpleChanges,OnChanges,QueryList } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import Cropper from "cropperjs";
import { FileItem, FileUploader,FileUploaderOptions } from 'ng2-file-upload';

@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.scss']
})
export class ImageCropperComponent implements OnInit {

  public imageBlob: Blob;
  myfiles=[];
  imageSource=[];
  i_th_image;
  imgPrvSrc:String="";
  @ViewChild('img')
  public imageElement: ElementRef;

  img:any;
  public event: EventEmitter<any> = new EventEmitter();
  constructor(public bsModalRef: BsModalRef) { }
  @Output() newItemEvent = new EventEmitter<File>();
  public ngAfterViewInit() {

    var cropper = new Cropper(this.imageElement.nativeElement, {
        zoomable: false,
        scalable: false,
        aspectRatio:0,
        crop: () => {
            // const canvas = this.cropper.getCroppedCanvas();
            // this.imgPrvSrc = canvas.toDataURL("image/png");
            cropper.getCroppedCanvas().toBlob((blob) => {
              this.imageBlob = blob;
              console.log('Crop saved as a Blob');
            });


        }
    });
}

  ngOnInit(): void {



  }


  public save() {

    const date: number = new Date().getTime();
    // Put the blob into the fileBits array of the File constructor
    const file = new File([this.imageBlob], 'photo.png', {type: 'image/png', lastModified: date});
    console.log(file)
    this.myfiles.push(file)
    this.event.emit(this.myfiles);
    this.bsModalRef.hide();
  }



}
