import { isObject } from 'util';
import { HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export class Utils {


    // Helper Function
    static objectToHttpParams(obj: any) {
        return Object.entries(obj || {}).reduce((params, [key, value]) => {
            return params.set(
                key,
                isObject(value) ? JSON.stringify(value) : String(value)
            );
        }, new HttpParams());
    }
    

  static handleError<T>(operation = 'operation', result?: T) {
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
  static log(message: string) {
    console.log(message);
  }

  static camelCase(str: String){
    var camel = str.replace(/(^|_)(\w)/g, function ($0, $1, $2) {
      return ($1 && ' ') + $2.toUpperCase();
    });
    console.log(camel);
    return camel;

  }
}