import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms"
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './views/pages/signup/signup.component';

import { MatInputModule } from '@angular/material/input';
import { LoginComponent } from './views/pages/login/login.component';
import { TopBarComponent } from './views/layouts/top-bar/top-bar.component';
import { UserService } from './core/services/user/user.service';
import { JwtService } from './core/services/jwt/jwt.service';
import { PostService } from './core/services/post/post.service';
import { HomeComponent } from './views/pages/home/home.component';
import { AddPostComponent } from './components/general/add-post/add-post.component';
import { PostComponent } from './views/pages/post/post.component';
import { ProfileComponent } from './views/pages/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    TopBarComponent,
    HomeComponent,
    AddPostComponent,
    PostComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule, MatToolbarModule, MatMenuModule, MatIconModule, MatSnackBarModule, MatCardModule
  ],
  providers: [UserService, JwtService, PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
