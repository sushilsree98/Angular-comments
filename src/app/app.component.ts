import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    // this.http
    //   .post(
    //     'https://ng-complete-guide-c56d3.firebaseio.com/posts.json',
    //     postData
    //   )
    //   .subscribe(responseData => {
    //     console.log(responseData);
    //   });

    this.http.post("https://fir-5b995.firebaseio.com/posts.json",postData)
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
    this.http.get("https://fir-5b995.firebaseio.com/posts.json")
     .subscribe(data=>{
       console.log(data);
     })
  }
}
