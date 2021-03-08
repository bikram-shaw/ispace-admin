import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MainComponent } from './main/main.component';
import { SidebarModule } from 'ng-sidebar';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClientComponent } from './client/client.component';
import { BidComponent } from './bid/bid.component';
import { BookingComponent } from './booking/booking.component';
import { PublishComponent } from './publish/publish.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgDynamicBreadcrumbModule } from "ng-dynamic-breadcrumb";
import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProjectsComponent } from './projects/projects.component';
import { UnitsComponent } from './units/units.component';
import { UsersComponent } from './users/users.component';
import { ChartsModule } from 'ng2-charts';
import { LoadingInterceptor } from './_helpers/loading.interceptor';
import { ImageCropperComponent } from './components/image-cropper/image-cropper.component';
import { NotificationComponent } from './notification/notification.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    DashboardComponent,
    ProjectsComponent,
    UnitsComponent,
    UsersComponent,
    ClientComponent,
    BidComponent,
    BookingComponent,
    PublishComponent,
    LoginComponent,
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
    ImageCropperComponent,


  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SidebarModule.forRoot(),
    NgDynamicBreadcrumbModule,
    DataTablesModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    ChartsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
     { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
