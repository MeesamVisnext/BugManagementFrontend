import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FormsModule } from '@angular/forms';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { LogoutComponent } from './logout/logout.component';
import { CustomInterceptor } from './interceptor/custom.interceptor';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ProjectsComponent } from './projects/projects.component';
import { BugsComponent } from './bugs/bugs.component';
import { TokenValidationInterceptor } from './interceptor/token-validation.interceptor';



@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginComponent,
    SignUpComponent,
    LogoutComponent,
    DashboardComponent,
    ProjectsComponent,
    BugsComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    ],
  providers: [CookieService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: CustomInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenValidationInterceptor,
    multi: true // Set to true to allow multiple interceptors
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
