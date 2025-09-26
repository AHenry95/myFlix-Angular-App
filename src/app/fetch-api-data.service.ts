import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

const apiUrl = 'https://myflix-ah-72292705dfa8.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {

  constructor(private http: HttpClient) {}

  public userRegistration(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  public userLogin(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  public getAllMovies(): Observable<any> {
    return this.http
      .get(apiUrl + 'movies', { headers: this.getAuthHeaders() })
      .pipe(
        map(this.extractResponseData), 
        catchError(this.handleError)
      );
  }

  public getOneMovie(movieTitle: string): Observable<any> {
    return this.http
      .get(apiUrl + `movies/${movieTitle}`, { headers: this.getAuthHeaders() })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  public getDirector(directorName: string): Observable<any> {
    return this.http
      .get(apiUrl + `director/${directorName}`, { headers: this.getAuthHeaders() })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  public getGenre(genreName: string): Observable<any> {
    return this.http
      .get(apiUrl + `genre/${genreName}`, { headers: this.getAuthHeaders() })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  public getUser(userId: string): Observable<any> {
    return this.http
      .get(apiUrl + `users/${userId}`, { headers: this.getAuthHeaders() })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  public getUserFavorites(userId: string): Observable<any> {
    return this.http
      .get(apiUrl + `users/${userId}/favs`, { headers: this.getAuthHeaders() })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  public addMovieToFavorites(userId: string, movieId: string): Observable<any> {
    return this.http
      .post(apiUrl + `users/${userId}/movies/${movieId}`, { headers: this.getAuthHeaders() })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  public editUser(userId: string, updatedUserDetails: any): Observable<any> {
    return this.http
      .put(apiUrl + `users/${userId}`, updatedUserDetails, { headers: this.getAuthHeaders() })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  public deleteUser(userId: string): Observable<any> {
    return this.http
      .delete(apiUrl + `users/${userId}`, { headers: this.getAuthHeaders() })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  public removeMovieFromFavorites(userId: string, movieId: string): Observable<any> {
    return this.http
      .delete(apiUrl + `users/${userId}/movies/${movieId}`, { headers: this.getAuthHeaders() })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status},` + `Error body is: ${error.error}`
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}