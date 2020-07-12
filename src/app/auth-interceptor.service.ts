import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

export class AuthInterceptor implements HttpInterceptor{

    intercept(req:HttpRequest<any>,next:HttpHandler){
        console.log("A Request is sent");
        return next.handle(req);
    }
}