import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import {LoadingService} from 'src/app/_services/loading.service'
import {delay} from 'rxjs/operators';
import {NotificationService} from 'src/app/_services/notification.service'
import { from } from 'rxjs';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {



  constructor() {

   }
  ngOnInit(): void {

  }

}
