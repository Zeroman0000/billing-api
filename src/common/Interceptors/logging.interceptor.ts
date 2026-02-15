import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { map, Observable, tap } from "rxjs";

export class LoggingInterceptor implements NestInterceptor{
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any>  {

    const ctx=context.switchToHttp();
    const request=ctx.getRequest();

    const method=request.method;
    const url=request.url;

    const date=Date.now();
      
    return next.handle().pipe(
        tap(()=>{
            const time=date-Date.now();
            console.log(`Response at ${url} ${method} ${time}ms`)
        })
    )
  }
}