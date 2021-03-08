import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services';
import { User } from './_models';
import { Observable } from 'rxjs';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentUser: User;
  title = 'iSpaceAdmin';
  isLoggedIn$: Observable<boolean>; 
  @ViewChild(NavbarComponent ) child: NavbarComponent ; 
 

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  } 
  

  ngOnInit() {
    this.isLoggedIn$ = this.authenticationService.isLoggedIn;
    console.log(this.isLoggedIn$);
  }

  toggleSlider(){
    this.child._toggleSidebar();
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
