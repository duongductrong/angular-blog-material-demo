import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user/user.service';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/core/services/jwt/jwt.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string = "";
  password: string = "";

  error: string = ""

  constructor(private userSerivce: UserService, private router: Router, private jwtService: JwtService) { }

  ngOnInit(): void {
    this.userSerivce.isAuthenticated().subscribe(status => {
      if (status) {
        this.router.navigate(["/"]);
      }
    })
  }

  onLogin(data): void {

    if (data.username && data.password) {
      this.userSerivce.login(data).subscribe((data) => {

        console.log(data);

        if (data.http_code === 400) {
          this.error = data.message
        }
        else {
          this.error = "";
          // this.router.navigate(["/"]);
          window.location.href = "/"
        }
      })
    }

  }
}
