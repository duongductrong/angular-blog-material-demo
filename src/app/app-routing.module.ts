import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupComponent } from './views/pages/signup/signup.component';
import { LoginComponent } from './views/pages/login/login.component';
import { HomeComponent } from './views/pages/home/home.component';
import { PostComponent } from './views/pages/post/post.component';

import { AuthGuard } from './security/auth.guard';
import { ProfileComponent } from './views/pages/profile/profile.component';

const routes: Routes = [
  {
    path: "", component: HomeComponent,
    canActivate: [AuthGuard],
  },
  { path: "post/:id", component: PostComponent, canActivate: [AuthGuard] },
  { path: "profile", component: ProfileComponent, canActivate: [AuthGuard] },
  {
    path: "signup",
    component: SignupComponent
  },
  {
    path: "login",
    component: LoginComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
