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

  /**
   * API call for user registration
   * @param userDetails
   */
  public userRegistration(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

 /**
   * API call for user registration
   * @param userDetails
   * @returns user information 
   */
  public userLogin(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * API call for list of all movies in databse
   * @returns all movies in database, plus all of their details
   */
  public getAllMovies(): Observable<any> {
    return this.http
      .get(apiUrl + 'movies', { headers: this.getAuthHeaders() })
      .pipe(
        map(this.extractResponseData), 
        catchError(this.handleError)
      );
  }

  /**
   * API call to get a single movie from the database
   * @param movieID
   * @returns object containing a single movie's details 
   */
  public getOneMovie(movieID: string): Observable<any> {
    return this.http
      .get(apiUrl + `movies/${movieID}`, { headers: this.getAuthHeaders() })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

   /**
   * API call to get information about a single director 
   * @param directorName
   * @returns object containing information about a single director
   */
  public getDirector(directorName: string): Observable<any> {
    return this.http
      .get(apiUrl + `director/${directorName}`, { headers: this.getAuthHeaders() })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

   /**
   * API call to get information about a single genre
   * @param genreName
   * @returns object containing information about a single director
   */
  public getGenre(genreName: string): Observable<any> {
    return this.http
      .get(apiUrl + `genre/${genreName}`, { headers: this.getAuthHeaders() })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * API call to get information about a single user
   * @param userID
   * @returns object containing information about a single user 
   */
  public getUser(userID: string): Observable<any> {
    return this.http
      .get(apiUrl + `users/${userID}`, { headers: this.getAuthHeaders() })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * API call to a single user's favorite movies
   * @param userID
   * @returns array containing a list of the user's favorite movies
   */
  public getUserFavorites(userID: string): Observable<any> {
    return this.http
      .get(apiUrl + `users/${userID}/favs`, { headers: this.getAuthHeaders() })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

   /**
   * API call add a movie to a users favorites 
   * @param userID
   * @param movieID
   * @returns an updated user object, reflecting changes made to the favorites list
   */
  public addMovieToFavorites(userID: string, movieID: string): Observable<any> {
    return this.http
      .post(apiUrl + `users/${userID}/movies/${movieID}`, { headers: this.getAuthHeaders() })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * API call add a movie to a users favorites 
   * @param userID
   * @param updatedUserDetails
   * @returns an updated user object, reflecting any changes made user details 
   */
  public editUser(userID: string, updatedUserDetails: any): Observable<any> {
    return this.http
      .put(apiUrl + `users/${userID}`, updatedUserDetails, { headers: this.getAuthHeaders() })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * API call add a movie to a users favorites 
   * @param userID
   * @returns message confirming the user account has been deleted 
   */
  public deleteUser(userId: string): Observable<any> {
    return this.http
      .delete(apiUrl + `users/${userId}`, { headers: this.getAuthHeaders() })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * API call add a movie to a users favorites 
   * @param userID
   * @param movieID
   * @returns an updated user object, reflecting any changes made to the user's favorites list 
   */
  public removeMovieFromFavorites(userID: string, movieID: string): Observable<any> {
    return this.http
      .delete(apiUrl + `users/${userID}/movies/${movieID}`, { headers: this.getAuthHeaders() })
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