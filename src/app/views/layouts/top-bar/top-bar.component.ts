import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  isAuthenticated: boolean = null;

  constructor(public userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.isAuthenticated().subscribe(status => {
      if (status !== this.isAuthenticated) {
        this.isAuthenticated = status;
      }
    })
  }

  logout(): void {
    if (this.userService.logout()) {
      this.router.navigate(["/login"])
    }
  }

}
