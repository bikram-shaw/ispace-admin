import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private http: HttpClient
  ) {}

  getSettings(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/notification/`)
      .pipe(
        tap(_ => this.log('fetched get')),
        catchError(this.handleError('get', []))
      );
  }

  updateSettings (data): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/notification/`,data)
      .pipe(
        tap(_ => this.log('edit')),
        catchError(this.handleError('edit', []))
      );
  }

  getEmail(type):Observable<any>
  {
    return this.http.get<any>(`${environment.apiUrl}/notification/email/`+type+"/")
      .pipe(
        tap(_ => this.log('fetched get')),
        catchError(this.handleError('get', []))
      );
  }
  addEmail(data):Observable<any>
  {
    return this.http.post<any>(`${environment.apiUrl}/notification/email/`,data)
      .pipe(
        tap(_ => this.log('add')),
        catchError(this.handleError('add', []))
      );
  }

  editEmail (type, data): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/notification/email/`+type+"/", data)
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
