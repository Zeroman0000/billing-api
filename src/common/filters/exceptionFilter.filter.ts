import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";

export class ExceptionFilterInterceptor implements ExceptionFilter{
    catch(exception: any, host: ArgumentsHost) {
         const ctx=host.switchToHttp();
         const request=ctx.getRequest();
         const response=ctx.getResponse();

         const status=exception.getStatus();

         response.status(status).json({
            statusCode:status,
            timestamp:new Date().toISOString(),
            path:request.url,
            message:exception.message,
         })
    }

}