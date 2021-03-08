import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadModule, FileDropDirective, FileSelectDirective } from 'ng2-file-upload';

@NgModule({
     imports: [ FileUploadModule],  
     declarations: [ ],
     exports :[ FileSelectDirective, FileDropDirective, CommonModule,
               FileUploadModule],
})

export class SharedModule { }
