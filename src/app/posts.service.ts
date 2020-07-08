import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators' 

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http:HttpClient) { }

  createPost(title:string, content:string){

    let postData:Post = {title,content}
    this.http.post<{ name: string }>("https://fir-5b995.firebaseio.com/posts.json", postData)
      .subscribe(data => {
        console.log(data);
      })
  }

  fetchPost(){
   return this.http.get<{ [key: string]: Post }>("https://fir-5b995.firebaseio.com/posts.json")
      .pipe(map(res => {
        const postKey: Post[] = [];

        for (let key in res) {
          if (res.hasOwnProperty(key)) {
            postKey.push({ ...res[key], id: key })
          }
        }

        return postKey;
      }))
  }
}
