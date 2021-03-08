import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup,Validators} from '@angular/forms'

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {
  addClientForm=new FormGroup(
    {
      name:new FormControl('',[Validators.required]),
      address:new FormControl('',Validators.required),
      mob1:new FormControl('',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      mob2:new FormControl('',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      email1:new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      email2:new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      cpn1:new FormControl('',Validators.required),
      cpn2:new FormControl('',Validators.required),

    }

  );

  constructor() { }

  ngOnInit(): void {
  }

  //function to get the data from add client form
  collectData()
  {
    console.log(this.addClientForm.value);
  }


  //addClientFormControl

  get addClientFormControl() {
    return this.addClientForm.controls;
  }

}
