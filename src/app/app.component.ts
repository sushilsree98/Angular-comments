import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Post } from './post.model';
import { PostsService } from './posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts:Post[] = [];
  isFetching = false;
  error = null;
  private error_subscription:Subscription;

  constructor(private http: HttpClient, private postService: PostsService) {}

  ngOnInit() {
    this.isFetching = true;
    this.error_subscription = this.postService.error
    .subscribe(err=>{
      this.error = err;
    })

    this.postService.fetchPost()
     .subscribe(data => {
      this.isFetching = false;
      this.loadedPosts = data;
      console.log(this.loadedPosts)
     },error=>{
       this.error = error.message;
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
      },error=>{
        this.error = error.message;
      })
  }

  onClearPosts() {
    // Send Http request
    this.postService.deletePost()
      .subscribe(data=>{
        console.log('post deleted')
        this.loadedPosts = [];
      })
  }

  ngOnDestroy(){
    this.error_subscription.unsubscribe();
  }

}
