import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FavoritesService } from '../favorites.service';
import { SynopsisDialogComponent } from '../synopsis-dialog/synopsis-dialog.component';  
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';

@Component({
  selector: 'app-movie-card',
  standalone: false,
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent implements OnInit, OnChanges {
  @Input() moviesToDisplay: any[] | null = null;
  movies: any[] = [];
  favoriteMovies: string[] = [];
  userID: string = '';

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public favoritesService: FavoritesService
  ) {}

  ngOnInit(): void {
    this.getUserInfo();

    if(!this.moviesToDisplay || this.moviesToDisplay.length === 0) {
      this.getMovies();
    } else {
      this.movies = this.moviesToDisplay;
    }

    this.favoritesService.favorites$.subscribe(favorites => {
      this.favoriteMovies = favorites;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['moviesToDisplay'] && changes['moviesToDisplay'].currentValue) {
      this.movies = changes['moviesToDisplay'].currentValue;
    }
  }

  getUserInfo(): void {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      this.userID = user._id;
      this.favoriteMovies = user.Favorites || [];
      this.favoritesService.updateFavorites(this.favoriteMovies);
    }
  }

  /**
   * returns an array of all the movies in the database
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((response: any) => {
      this.movies = response;
      console.log(this.movies);
      return this.movies;
    });
  }

  isFavorite(movieID: string): boolean {
    return this.favoriteMovies.includes(movieID);
  }

  toggleFavorite(movie: any): void {
    const movieID = movie._id;

    if (this.isFavorite(movieID)) {

      // Remove from favorites
      this.fetchApiData.removeMovieFromFavorites(this.userID, movieID).subscribe({
        next: (response: any) => {
          this.favoriteMovies = response.Favorites;
          const userString = localStorage.getItem('user');
          if (userString) {
            const user = JSON.parse(userString);
            user.Favorites = response.Favorites;
            localStorage.setItem('user', JSON.stringify(user));
          }
          this.favoritesService.updateFavorites(response.Favorites);
          this.snackBar.open(`${movie.Title} removed from favorites`, 'OK', {
            duration: 2000
          });
        },
        error: () => {
          this.snackBar.open('Failed to remove from favorites', 'OK', {
            duration: 2000
          });
        }
      });
    } else {

      //Add to Favorites
      this.fetchApiData.addMovieToFavorites(this.userID, movieID).subscribe({
        next: (response: any) => {
          this.favoriteMovies = response.Favorites;
          const userString = localStorage.getItem('user');
          if (userString) {
            const user = JSON.parse(userString);
            user.Favorites = response.Favorites;
            localStorage.setItem('user', JSON.stringify(user));
          }
          this.favoritesService.updateFavorites(response.Favorites);
          this.snackBar.open(`${movie.Title} aded to favorites`, 'OK', {
            duration: 2000
          });
        },
        error: () => {
          this.snackBar.open('Failed to add to favorites', 'OK', {
            duration: 2000
          });
        }
      });
    }
  }

  openSynopsisDialog(movie: any): void {
    this.dialog.open(SynopsisDialogComponent, {
      data: {
        title: movie.Title,
        synopsis: movie.Description,
      },
      width: '600px'
    });
  }

  openGenreDialog(movie: any): void {
    this.dialog.open(GenreDialogComponent, {
      data: {
        name: movie.Genre.Name,
        description: movie.Genre.Description
      },
      width: '600px'
    });
  }

  openDirectorDialog(movie: any): void {
    this.dialog.open(DirectorDialogComponent, {
      data: {
        name: movie.Director.Name,
        bio: movie.Director.Bio,
        birthyear: movie.Director.Birthyear
      },
      width: '600px'
    });
  }
}