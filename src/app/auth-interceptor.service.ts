import { HttpInterceptor, HttpRequest, HttpHandler} from '@angular/common/http';

export class AuthInterceptor implements HttpInterceptor{

    intercept(req:HttpRequest<any>,next:HttpHandler){
        console.log("A Request is sent");
        const newReq = req.clone({
                headers:req.headers.append('Auth','ABCD')
            })
        return next.handle(newReq)
    }
}