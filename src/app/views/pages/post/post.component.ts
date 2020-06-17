import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/core/services/post/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  post: any = {}

  constructor(private routerActive: ActivatedRoute, private postService: PostService) { }

  ngOnInit(): void {
    const { id } = this.routerActive.snapshot.params;
    this.postService.getPost(Number(id)).subscribe(response => {
      this.post = response.payload[0].post;
    })
  }

}
