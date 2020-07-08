import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Post } from './post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts:Post[] = [];
  isFetching = false;

  constructor(private http: HttpClient, private postService: PostsService) {}

  ngOnInit() {
    this.isFetching = true
    this.postService.fetchPost()
     .subscribe(data => {
      this.isFetching = false;
      this.loadedPosts = data;
      console.log(this.loadedPosts)
     })
  }

  onCreatePost(postData:Post) {
    this.postService.createPost(postData.title,postData.content);
  }

  onFetchPosts() {
    // Send Http request
    this.isFetching = true
    this.postService.fetchPost()
      .subscribe(data => {
        this.isFetching = false;
        this.loadedPosts = data;
      })
  }

  onClearPosts() {
    // Send Http request
  }

}
