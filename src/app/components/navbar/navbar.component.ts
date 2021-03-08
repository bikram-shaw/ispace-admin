import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  
  public opened: boolean = true;
  
  constructor() { }

  ngOnInit(): void {
  }
 
  public _toggleSidebar() {
    //alert("aaa");
    this.opened = !this.opened;
    console.log(this.opened);
  }

}
