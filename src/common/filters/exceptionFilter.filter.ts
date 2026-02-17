import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";

export class ExceptionFilterInterceptor implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();

        let status: number;
        let message: any;

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            message = exception.getResponse();
        } else {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            message = exception.message || 'Internal server error';
        }

        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: exception.message,
        })
    }

}