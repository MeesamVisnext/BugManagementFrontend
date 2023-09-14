import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomePageComponent } from './home-page/home-page.component';
import { authGuard } from './guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectsComponent } from './projects/projects.component';
import { ManagerGuard } from './guards/manager.guard';
import { BugsComponent } from './bugs/bugs.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'SignUp', component: SignUpComponent},
  { path: 'dashboard', 
    component: DashboardComponent,
    canActivate:[authGuard]},
  { path: 'projects', 
    component:ProjectsComponent,},
    // canActivate:[ManagerGuard]},
    {
      path: 'bugs', 
      component: BugsComponent,
      canActivate:[authGuard]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
