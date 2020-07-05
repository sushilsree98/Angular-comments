import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Post } from './post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.onFetchPosts();
  }

  onCreatePost(postData:Post) {
    // Send Http request
    // this.http
    //   .post(
    //     'https://ng-complete-guide-c56d3.firebaseio.com/posts.json',
    //     postData
    //   )
    //   .subscribe(responseData => {
    //     console.log(responseData);
    //   });

    this.http.post<{name : string}>("https://fir-5b995.firebaseio.com/posts.json",postData)
      .subscribe(data =>{
        console.log(data);
      })
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPost();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPost(){
    this.http.get<{[key : string] : Post}>("https://fir-5b995.firebaseio.com/posts.json")
      .pipe(map(res=>{
        const postKey: Post[] = [];

        for(let key in res){
          if(res.hasOwnProperty(key)){
            postKey.push({ ...res[key], id:key })
          }
        }

        return postKey;
      }))
     .subscribe(data=>{
       console.log(data);
     })
  }
}
