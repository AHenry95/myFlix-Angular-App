import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { FavoritesService} from '../favorites.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { UserEditFormComponent } from '../user-edit-form/user-edit-form.component';

/**
 * The UserProfile Component displays the user's profile information (Name, Username, Email, and Birthdate (if added)).
 * Additionally, UserProfile included two buttons:
 * 1. Edit Profile - this opens the UserEditForm component, a dialog that allows the user to edit their account information
 * 2. Logout - logs out the user, clears the localStorage, and returns the user to the WelcomePage
 * 
 * Lastly, the UserProfile Component displays the MovieCard Component, but only displays the movie's the user has added to their favorite's list. 
 */

@Component({
  selector: 'app-user-profile',
  standalone: false,
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  favoriteMovies: any[] = [];
  userID: any = '';

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public favoritesService: FavoritesService
  ) {}

  ngOnInit(): void {
    const userString = localStorage.getItem('user');

    if (!userString) {
      this.router.navigate(['welcome']);
      return;
    }

    try {
      const storedUser = JSON.parse(userString);
      this.user = storedUser;
      this.userID = storedUser._id;

      if (!this.user) {
        this.router.navigate(['welcome']);
        return;
      }

      this.loadUserProfile();

      /** 
       * Subscribes the the favorites service in order to keep the displayed favorite movies up to date with any changes made. 
       * */
      this.favoritesService.favorites$.subscribe(favorites => {
        if (this.user.Favorites) {
          this.user.Favorites = favorites;
          this.getFavoriteMovies();
        }
      })
    } catch (e) {
      console.error('Error parsing user from localStorage', e);
      this.router.navigate(['welcome']);
    }
  }

  loadUserProfile(): void {
    if (!this.userID) {
      this.router.navigate(['welcome']);
      return;
    }

    this.fetchApiData.getUser(this.userID).subscribe({
      next: (response: any) => {
        console.log('User data received:', response);
        this.user = response;
        this.getFavoriteMovies();
      },
      error: (error: any) => {
        console.error('Error fetching user', error);
        this.snackBar.open('Failed to open user profile', 'OK', {
          duration: 3000
        });
      }
    });
  }

  getFavoriteMovies(): void {
    if (!this.userID) return;

    this.fetchApiData.getAllMovies().subscribe((movies: any) => {
      this.favoriteMovies = movies.filter((movie: any) => 
        this.user.Favorites.includes(movie._id)
      );
    })
  }

  removeFavorite(movieID: string): void {
    if (!this.userID) return;

    this.fetchApiData.removeMovieFromFavorites(this.userID, movieID).subscribe(() => {
      this.snackBar.open('Movie removed from favorites', 'OK', {
        duration: 2000
      });
      this.loadUserProfile();
    });
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
    this.snackBar.open('You have been logged out', 'OK', {
      duration: 2000
    });
  }

  openEditDialog(): void {
    const dialogRef = this.dialog.open(UserEditFormComponent, {
      width: '400px',
      data: { user: this.user }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUserProfile();
      }
    });
  }
}