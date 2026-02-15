import { CallHandler, ExecutionContext, NestInterceptor, RequestTimeoutException } from "@nestjs/common";
import { catchError, Observable, throwError, timeout } from "rxjs";

export class TimeoutInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        return next.handle().pipe(
            timeout(5000),
            catchError(err=>{
                if(err.name=='TimeoutError'){
                    return throwError(()=>new RequestTimeoutException(`Request Time out`));
                } else {
                    return throwError(()=>err);
                }
            })
        )
    }
}