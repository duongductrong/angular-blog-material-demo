import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user/user.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  username: string = "";
  password: string = "";
  fullname: string = "";

  errors = {};

  constructor(private userSerivce: UserService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onSignUp(data): void {
    // if (data.username && data.password) {
    this.userSerivce.signUp(data).subscribe(response => {
      if (response.http_code === 200) {
        this.snackBar.open(response.message, 'Hide');

        this.errors = { message: "", http_code: 200, status: "" };
      }
      else {
        this.snackBar.open(`Status ${response.http_code} : ${response.message}`, 'Hide');

        // this.errors = 
        this.errors = response.payload.find(el => el["errors"]).errors

        console.log(this.errors['fullname']);
      }
    })
  }
  // }
}
