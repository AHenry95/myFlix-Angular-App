import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FavoritesService } from '../favorites.service';
import { SynopsisDialogComponent } from '../synopsis-dialog/synopsis-dialog.component';  
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';

/**
 * Component for displaying movie cards with detailed information, and favorite toggle functionality. 
 * 
 * The MovieCard component contains logic for displaying information about movie contained in the database. 
 * The component includes logic for displaying all movies in the database,
 * filtering to only show movies included in a user's favorites list, 
 * and adding/removing movies from a user's favorites.
 * 
 * @component
 * @selector
 */
@Component({
  selector: 'app-movie-card',
  standalone: false,
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent implements OnInit, OnChanges {
  /**
   * Optional array of movies to display. If null/empty, all movies will be fetched.
   * Currently used to filter movies to show only favorites movies on user profile page.
   * In the future this could be used to implement filtering by characteristic (i.e., genre, director, etc.) on the main movies page.
   */
  @Input() moviesToDisplay: any[] | null = null;

  /** Array of all movies to be displayed */
  movies: any[] = [];
  /** Array of movie IDs that are in the user's favorites list */
  favoriteMovies: string[] = [];
  /** The current user's user ID */
  userID: string = '';

  /**
   * Creates an instance of the MovieCardComponent.
   * 
   * @param fetchApiData - Service for making API calls
   * @param dialog - Material Dialog service for opening info dialogs
   * @param snackBar - Material SnackBar service for user notifications
   * @param favoritesService - Service for managing favorites state across components
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public favoritesService: FavoritesService
  ) {}

  /**
   * Angular hook that runs on component initialization.
   * Loads user information, fetches movies (if needed), and subscribes to favorites service for updates. 
   */
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

  /**
   * Angular hook that runs when properties change.
   * Updates the displayed movies when the moviesToDisplay input changes.
   * 
   * @param changes - Object containing changed properties. 
   */
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['moviesToDisplay'] && changes['moviesToDisplay'].currentValue) {
      this.movies = changes['moviesToDisplay'].currentValue;
    }
  }

  /**
   * Retrieves user information from localStorage and and updates component state.
   * Extracts user ID and favorites list from stored user data. 
   */
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
   * Fetches all movies from the API and updates the movies array.
   * 
   * @returns An array of all movies in the database
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((response: any) => {
      this.movies = response;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * Checks if a movie is in the user's favorites list.
   * 
   * @param  movieID - The movie's unique ID string in the database
   * @returns True if the movie is in the user's favorites; false otherwise  
   */
  isFavorite(movieID: string): boolean {
    return this.favoriteMovies.includes(movieID);
  }

  /**
   * Toggles a movie's favorite status.
   * Adds a movie to a user's favorite if not already present, and removes previously favorited movies.
   * Updates localStorage and shows notifications for user.
   * 
   * @param movie - The movie object to be added or removed from the user's favorites 
   */
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

  /**
   * Opens a dialog displaying the movie's synopsis
   * 
   * @param movie - The movie object containing its title and description
   */
  openSynopsisDialog(movie: any): void {
    this.dialog.open(SynopsisDialogComponent, {
      data: {
        title: movie.Title,
        synopsis: movie.Description,
      },
      width: '600px'
    });
  }

  /** 
   * Opens a dialog diaplays information about the movie's genre.
   * 
   * @param movie - The movie object containing the genre information
   */
  openGenreDialog(movie: any): void {
    this.dialog.open(GenreDialogComponent, {
      data: {
        name: movie.Genre.Name,
        description: movie.Genre.Description
      },
      width: '600px'
    });
  }

  /**
   * Opens a dialog displaying information about the movie's director.
   * 
   * @param movie - The movie object containing director information
   */
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