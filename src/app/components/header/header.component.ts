import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output("logoutFn") logoutFn: EventEmitter<any> = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
  }


  logout(){
    this.logoutFn.emit();
  }


}
