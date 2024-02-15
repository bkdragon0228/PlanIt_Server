import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        const classname = context.getClass().name;
        const hanldername = context.getHandler().name;
        console.error(
          `Error : ${classname} - ${hanldername} -  ${error.status} ${error.message} `,
        );

        return throwError(() => error);
      }),
    );
  }
}
