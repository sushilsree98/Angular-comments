import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http'
import { map, catchError, tap } from 'rxjs/operators' 
import { Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

 error = new Subject<string>();

  constructor(private http:HttpClient) { }

  createPost(title:string, content:string){

    let postData:Post = {title,content}
    this.http.post<{ name: string }>("https://fir-5b995.firebaseio.com/posts.json", postData,{
      'observe':'response',
      'responseType':'json'
    })
      .subscribe(data => {
        console.log(data);
      },error=>{
        this.error.next(error.message);
      })
  }

  fetchPost(){
    let queryParams = new HttpParams();
    queryParams = queryParams.append('print','pretty');
    queryParams = queryParams.append('Hello','world')

   return this.http.get<{ [key: string]: Post }>("https://fir-5b995.firebaseio.com/posts.json",{
     headers : new HttpHeaders({
      'custom-header': 'Hello world'
     }),
     params: queryParams
   })
      .pipe(map(res => {
        const postKey: Post[] = [];

        for (let key in res) {
          if (res.hasOwnProperty(key)) {
            postKey.push({ ...res[key], id: key })
          }
        }

        return postKey;
      }),
      catchError(error=>{
        return throwError(error);
      })
      )
  }

  deletePost(){
   return this.http.delete("https://fir-5b995.firebaseio.com/posts.json",{
     'observe':'events'
   })
   .pipe(
     tap(event=>{
       if(event.type === HttpEventType.Response){
         console.log(event.body);
       }
     })
   )
  }
}
