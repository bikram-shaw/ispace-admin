import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '../_services/authentication.service';
import * as utils from '../_helpers/utils';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.authenticationService.logout();
                location.reload(true);
            }
            else if (err.status === 400) {
                let error_message = "";
                for (let item in err.error) {
                    error_message = error_message + utils.Utils.camelCase(item) + ": ";
                    for (let i = 0; i < err.error[item].length; i++) {
                        error_message = error_message + " " + err.error[item][i];
                    }
                    if(error_message != "") error_message = error_message + ", "
                }

                return throwError(error_message);
            }
            else {
                const error = err.error.message || err.statusText;
                return throwError(error);
            }


        }))
    }
}