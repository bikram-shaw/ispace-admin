import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { isObject } from 'util';

@Injectable({
  providedIn: 'root'
})
export class BidService {


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


  bidDatatable(dt_params){
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



  list(filters, pageSize = 5, page = 1, paginate = false): Observable<any> {
    let url_segment = "";
    if (filters) url_segment = url_segment + "?filters=" + encodeURI(JSON.stringify(filters));
    if (paginate) {
      url_segment = url_segment + "&page=" + page;
      url_segment = url_segment + "&page_size=" + pageSize;
    }
    return this.http.get(`${environment.apiUrl}/bid/` + url_segment)
      .pipe(
        tap(_ => this.log('fetched bid')),
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }



  get(id): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/bid/`+id+"/")
      .pipe(
        tap(_ => this.log('fetched get')),
        catchError(this.handleError('get', []))
      );
  }

  add (data): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/bid/`, data)
      .pipe(
        tap(_ => this.log('add')),
        catchError(this.handleError('add', []))
      );
  }

  edit (id, data): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/bid/`+id+"/", data)
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
