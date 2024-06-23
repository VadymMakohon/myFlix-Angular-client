// src/app/fetch-api-data.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

const apiUrl = 'https://myflix-2024-e9df13718d8a.herokuapp.com';

/**
 * Service to fetch API data for the myFlix application.
 */
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  constructor(private http: HttpClient) { }

  /**
   * Gets the token from localStorage.
   * @returns The user token.
   */
  private getToken(): string {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).token : '';
  }

  /**
   * Handles HTTP errors.
   * @param error The HTTP error response.
   * @returns An observable with an error message.
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(`Error Status code ${error.status}, Error body is: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }

  /**
   * Registers a new user.
   * @param userDetails The user details.
   * @returns An observable with the server response.
   */
  public userRegistration(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + '/users', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * Logs in a user.
   * @param userDetails The user details.
   * @returns An observable with the server response.
   */
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(`${apiUrl}/login`, userDetails)
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Fetches all movies.
   * @returns An observable with the list of all movies.
   */
  public getAllMovies(): Observable<any> {
    return this.http.get(apiUrl + '/movies', {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      })
    }).pipe(
      map(this.extractResponseData), catchError(this.handleError)
    );
  }

  /**
   * Fetches a movie by title.
   * @param title The title of the movie.
   * @returns An observable with the movie details.
   */
  public getMovieWithTitle(title: string): Observable<any> {
    return this.http.get(`${apiUrl}/movies/${title}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      })
    }).pipe(
      map(this.extractResponseData), catchError(this.handleError)
    );
  }

  /**
   * Fetches a director by name.
   * @param directorName The name of the director.
   * @returns An observable with the director details.
   */
  public getDirector(directorName: string): Observable<any> {
    return this.http.get(`${apiUrl}/directors/${directorName}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      })
    }).pipe(
      map(this.extractResponseData), catchError(this.handleError)
    );
  }

  /**
   * Fetches a user by ID.
   * @param userId The ID of the user.
   * @returns An observable with the user details.
   */
  public getUser(userId: string): Observable<any> {
    return this.http.get(`${apiUrl}/users/${userId}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      })
    }).pipe(
      map(this.extractResponseData), catchError(this.handleError)
    );
  }

  /**
   * Adds a movie to the user's list of favorite movies.
   * @param userID The ID of the user.
   * @param title The title of the movie.
   * @returns An observable with the server response.
   */
  public addFavoriteMovie(userID: string, title: string): Observable<any> {
    return this.http.post(`${apiUrl}/users/${userID}/movies/${title}`, {}, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      })
    }).pipe(
      map(this.extractResponseData), catchError(this.handleError)
    );
  }

  /**
   * Removes a movie from the user's list of favorite movies.
   * @param userID The ID of the user.
   * @param title The title of the movie.
   * @returns An observable with the server response.
   */
  public deleteFavoriteMovie(userID: string, title: string): Observable<any> {
    return this.http.delete(`${apiUrl}/users/${userID}/movies/${title}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      })
    }).pipe(
      map(this.extractResponseData), catchError(this.handleError)
    );
  }

  /**
   * Edits a user's details.
   * @param userDetails The new user details.
   * @returns An observable with the server response.
   */
  public editUser(userDetails: any): Observable<any> {
    return this.http.put(`${apiUrl}/users/${userDetails.id}`, userDetails, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      })
    }).pipe(
      map(this.extractResponseData), catchError(this.handleError)
    );
  }

  /**
   * Deletes a user.
   * @param userID The ID of the user.
   * @returns An observable with the server response.
   */
  public deleteUser(userID: string): Observable<any> {
    return this.http.delete(`${apiUrl}/users/${userID}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      })
    }).pipe(
      map(this.extractResponseData), catchError(this.handleError)
    );
  }

  /**
   * Extracts the response data from the HTTP response.
   * @param res The HTTP response.
   * @returns The response body or an empty object.
   */
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }
}
