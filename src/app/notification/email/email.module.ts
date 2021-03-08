import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { EmailRoutingModule } from './email-routing.module';
import { AddEmailComponent } from './add-email/add-email.component';
import { UpdateEmailComponent } from './update-email/update-email.component';
import { EditorModule,TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';

@NgModule({
  declarations: [AddEmailComponent, UpdateEmailComponent],
  imports: [
    CommonModule,
    EmailRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule
  ]
})
export class EmailModule { }
