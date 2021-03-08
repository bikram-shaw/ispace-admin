import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { isObject } from 'util';
import { param } from 'jquery';

@Injectable({ providedIn: 'root' })
export class UserService {
    private _url: any = "";

  constructor(
    private http: HttpClient
  ) {
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
  datatable(dt_params){
    const params = this.objectToHttpParams(dt_params);
    console.log('params', params);
    return this.http.get<any>(`${environment.apiUrl}/users/?format=datatables`,

    )
    .pipe(
      tap(_ => this.log('fetched get')),
      catchError(this.handleError('get', []))
    );

  }


  bidHistorydatatable(dt_params){
    const params = this.objectToHttpParams(dt_params);
    console.log('params', params);
    return this.http.get<any>(`${environment.apiUrl}/dt/users/`,
    {

      params: params,
    })
    .pipe(
      tap(_ => this.log('fetched get')),
      catchError(this.handleError('get', []))
    );

  }
  bookingHistorydatatable(dt_params){
    const params = this.objectToHttpParams(dt_params);
    console.log('params', params);
    return this.http.get<any>(`${environment.apiUrl}/dt/users/`,
    {

      params: params,
    })
    .pipe(
      tap(_ => this.log('fetched get')),
      catchError(this.handleError('get', []))
    );

  }
  transactionHistorydatatable(dt_params){
    const params = this.objectToHttpParams(dt_params);
    console.log('params', params);
    return this.http.get<any>(`${environment.apiUrl}/dt/users/`,
    {

      params: params,
    })
    .pipe(
      tap(_ => this.log('fetched get')),
      catchError(this.handleError('get', []))
    );

  }
  subscriptionHistorydatatable(dt_params){
    const params = this.objectToHttpParams(dt_params);
    console.log('params', params);
    return this.http.get<any>(`${environment.apiUrl}/dt/users/`,
    {

      params: params,
    })
    .pipe(
      tap(_ => this.log('fetched get')),
      catchError(this.handleError('get', []))
    );

  }
  list(filters, pageSize = 5, page = 1, paginate = false): Observable<any> {
    let url_segment = "";
    if (filters) url_segment = url_segment + "?filters=" + encodeURI(JSON.stringify(filters));
    if (paginate) {
      url_segment = url_segment + "&page=" + page;
      url_segment = url_segment + "&page_size=" + pageSize;
    }
    return this.http.get(`${environment.apiUrl}/users/` + url_segment)
      .pipe(
        tap(_ => this.log('fetched users')),
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }



  getUsers(id): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/users/`+id+"/")
      .pipe(
        tap(_ => this.log('fetched get')),
        catchError(this.handleError('get', []))
      );
  }

  addUsers (data): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/users/`, data)
      .pipe(
        tap(_ => this.log('add')),
        catchError(this.handleError('add', []))
      );
  }

  editUsers (id, data): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/users/`+id+"/", data)
      .pipe(
        tap(_ => this.log('edit')),
        catchError(this.handleError('edit', []))
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
