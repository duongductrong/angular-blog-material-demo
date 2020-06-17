import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PostService } from 'src/app/core/services/post/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

  title: string = ""
  content: string = "";
  image: string = "";

  @Output() onCompleted: EventEmitter<any> = new EventEmitter();

  constructor(private postService: PostService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onCreatePost(data) {

    if (data.title && this.content && this.image) {
      this.postService.createPost(data).subscribe((response) => {
        this.onCompleted.emit(response.payload[0].post);
      })
    }
    else {
      this.snackBar.open("Please to type something before press post", "Hide")
    }

  }


}
