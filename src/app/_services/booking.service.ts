import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpParams } from '@angular/common/http';
import { isObject } from 'util';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor( private http: HttpClient ) {
  }
  // Helper Function
  objectToHttpParams(obj: any) {
    return Object.entries(obj || {}).reduce((params, [key, value]) => {
      return params.set(
        key,
        isObject(value) ? JSON.stringify(value) : String(value)
      );
    }, new HttpParams());
  }

  historyDatatable(dt_params){
    const params = this.objectToHttpParams(dt_params);
    console.log('params', params);
    return this.http.get<any>(`${environment.apiUrl}/dt/bids/`,
    {
      params: params,
    })
    .pipe(
      tap(_ => this.log('fetched get')),
      catchError(this.handleError('get', []))
    );

  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(message);
  }
}
