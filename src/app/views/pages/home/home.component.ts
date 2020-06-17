import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/core/services/post/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  posts: any[] = []

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getPosts().subscribe(data => {
      if (data.http_code === 403) return;

      this.posts = data.payload[0].posts;
    })
  }

  onCreated(data): any {
    this.posts.unshift(data);
  }
}
