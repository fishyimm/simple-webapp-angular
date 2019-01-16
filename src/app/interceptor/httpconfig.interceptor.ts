import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token: string = localStorage.getItem("token");

    if (token) {
      request = request.clone({
        headers: request.headers.set("Authorization", "Bearer " + token)
      });
    }

    if (!request.headers.has("Content-Type")) {
      request = request.clone({
        headers: request.headers.set("Content-Type", "application/json")
      });
    }

    request = request.clone({
      headers: request.headers.set("Accept", "application/json")
    });

    request = request.clone({
      setHeaders: {
        tum: "deeja",
        tumja: "eiei",
        "Cache-Control": "no-cache",
        Pragma: "no-cache"
      }
    });

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log("event--->>>", event);
          console.log("event--->>>", event.body);
          console.log("event--->>>", event.status);
          console.log("event--->>>", event.ok);
          // this.errorDialogService.openDialog(event);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        let data = {};
        data = {
          reason: error && error.error.reason ? error.error.reason : "",
          status: error.status
        };
        console.log("data", data);
        return throwError(error);
      })
    );
  }
}
