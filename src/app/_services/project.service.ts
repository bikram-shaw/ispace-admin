import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import * as utils from '../_helpers/utils';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private _url: any = "";

  constructor(
    private http: HttpClient
  ) {
  }

  datatable(dt_params) {
    const params = utils.Utils.objectToHttpParams(dt_params);
    console.log('params', params);
    return this.http.get<any>(`${environment.apiUrl}/dt/projects/`,
      {
        params: params,
      })
      .pipe(
        tap(_ => utils.Utils.log('fetched get')),
        catchError(utils.Utils.handleError('get', []))
      );

  }

  datatableUnits(dt_params,id) {
    const params = utils.Utils.objectToHttpParams(dt_params);
    console.log('params', params);
    return this.http.get<any>(`${environment.apiUrl}/dt/project-unit/` + id + "/",
      {
        params: params,
      })
      .pipe(
        tap(_ => utils.Utils.log('fetched get')),
        catchError(utils.Utils.handleError('get', []))
      );

  }

  list(): Observable<any> {

    return this.http.get(`${environment.apiUrl}/projects/` )
      .pipe(
        tap(_ => utils.Utils.log('fetched projects')),
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

  get(id): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/projects/` + id + "/")
      .pipe(
        tap(_ => utils.Utils.log('fetched get')),
        catchError(utils.Utils.handleError('get', []))
      );
  }

  add(data): Observable<any> {
    const headerOptions = new HttpHeaders();

    headerOptions.set('Content-Type', 'multipart/form-data');
    return this.http.post<any>(`${environment.apiUrl}/projects/`, data, { 'headers': headerOptions })
      .pipe(
        tap(data => {
          utils.Utils.log('add')
          return data
        }),
        catchError((error: HttpErrorResponse) => {
          utils.Utils.handleError('add', [])
          return throwError(error);
        })
      );
  }

  edit(id, data): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/projects/` + id + "/", data)
      .pipe(
        tap(data => {
          utils.Utils.log('edit')
          return data
        }),
        catchError((error: HttpErrorResponse) => {
          utils.Utils.handleError('edit', [])
          return throwError(error);
        })
      );
  }

 publish(id):Observable<any>
 {
  const headerOptions = new HttpHeaders();
   return this.http.post<any>(`${environment.apiUrl}/projects/` + id + "/",{ 'headers': headerOptions }).pipe
   (
    tap(data => {
      utils.Utils.log('publish')
      return data
    }),
    catchError((error: HttpErrorResponse) => {
      utils.Utils.handleError('publish', [])
      return throwError(error);
    })
   );

 }


}
