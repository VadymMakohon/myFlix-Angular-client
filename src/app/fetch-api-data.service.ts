import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

// Declaring the api url that will provide data for the client app
const apiUrl = 'https://myflix-2024-e9df13718d8a.herokuapp.com';

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) { }

  private getToken(): string {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).token : '';
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(`Error Status code ${error.status}, Error body is: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }

  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + '/user', userDetails)
      .pipe(catchError(this.handleError));
  }

  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(`${apiUrl}/login`, userDetails)
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  public getAllMovies(): Observable<any> {
    return this.http.get(apiUrl + '/movies', {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      })
    }).pipe(
      map(this.extractResponseData), catchError(this.handleError)
    );
  }

  public getMovieWithTitle(title: string): Observable<any> {
    return this.http.get(`${apiUrl}/movie/${title}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      })
    }).pipe(
      map(this.extractResponseData), catchError(this.handleError)
    );
  }

  public getDirector(directorName: string): Observable<any> {
    return this.http.get(`${apiUrl}/director/${directorName}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      })
    }).pipe(
      map(this.extractResponseData), catchError(this.handleError)
    );
  }

  public getUserList(): Observable<any> {
    return this.http.get(`${apiUrl}/users`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      })
    }).pipe(
      map(this.extractResponseData), catchError(this.handleError)
    );
  }

  public addFavoriteMovie(userID: string, title: string): Observable<any> {
    return this.http.post(`${apiUrl}/user/${userID}/${title}`, {}, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      })
    }).pipe(
      map(this.extractResponseData), catchError(this.handleError)
    );
  }

  public deleteFavoriteMovie(userID: string, title: string): Observable<any> {
    return this.http.delete(`${apiUrl}/user/${userID}/${title}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      })
    }).pipe(
      map(this.extractResponseData), catchError(this.handleError)
    );
  }

  public editUser(userDetails: any): Observable<any> {
    return this.http.put(`${apiUrl}/user/${userDetails.id}`, userDetails, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      })
    }).pipe(
      map(this.extractResponseData), catchError(this.handleError)
    );
  }

  public deleteUser(userID: string): Observable<any> {
    return this.http.delete(`${apiUrl}/user`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      }),
      body: { id: userID }
    }).pipe(
      map(this.extractResponseData), catchError(this.handleError)
    );
  }

  // Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }
}