import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profile: any = {};

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getProfile().subscribe(response => {

      if (response.payload[0]["userLogin"]) {
        this.profile = response.payload[0]["userLogin"];
      }
    })
  }

}
