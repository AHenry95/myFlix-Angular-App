# myFlix - Angular Client App

A client app created with Angular for the [movie_api](https://github.com/AHenry95/movie_api), that provides users with access to information about a number of movies, directors, and film genres. Users can create profiles, browse through the available movies, and add/remove movies from their favorites list, which is displayed on their profile page. 

## Features
- **Usere Authentication**: Secure user registration and login system using JWT authentication
- **Movie Browsing**: Authenticated users can browse a display of cards showing each movie pulled from the database
- **Movie Details**:Each movie card displays a number of details:
  - The movie's title
  - The movie's director
  - A high-definition movie poster image
  - Each card also displayed three buttons that open different dialogs:
    - Director - Shows basic information about the movie's director (name, brief bio, year of birth)
    - Genre - Shows basic information about the movie's genre (genre name, brief description)
    - Synopsis - Displays a short synopsis of the movie   
- **Easy Navigation**: A nav bar at the top of the page allows users to easily navigate between the movie view and user profile view, as well as providing an easy way to log out
- **User Profile**: Users can view and edit their account details (Name, Username, Date of Birth, email address, and password (password is edit only, cannot be viewed). Users can also view the movie cards of movies added to their favorites list in this view.  
- **Favorites Management**: Each movie card includes a button that allows users to toggle movies to/from their favorites list. 
- **Real-Time Updates**: Changes to the user favorites are automatically updated and kept in-sync across the different views

## Tech Stack

- Angular 19.2.0
- TypeScript 5.7.2
- Angular Material 19.2.19
- SCSS
- RxJS 7.8.0
- Amgular Router 19.2.0
- Angular CLI 19.2.17

## Installation
1. **Clone the repository**
```Bash 
   git clone https://github.com/AHenry95/myFlix-Angular-App
   cd myFlix-Angular-App
```

2. **Install dependencies**
```bash
  npm install
```

## Application Routes
| Route | Component | Description |
|-------|-----------|-------------|
| `/welcome` | WelcomePageComponent | Landing page with login/signup options |
| `/movies` | MovieCardComponent | Main movie browsing interface |
| `/profile` | UserProfileComponent | User profile and favorites management |
| `/` | Redirect | Redirects to `/welcome` |

## Key Components

### WelcomePageComponent
Landing the provides options for the exisiting users to login or new users to register. Accessible to unauthenticated users.

### MovieCardComponent
- Displays movie title, director, and poster image
- Includes buttons for displaying dialogs that display the movie's synopsis, info on the genre, or info on the director.
- Includes favorite/unfavorite toggle button.

### UserProfileComponent
- Displays user porfile details (minus the user's password)
- Displays button to open dialog that allows user to edit their profile details (including changing their password)
- Displays button that allows user to logout
- Displays movie cards for user's favorite movies

## Services

### FetchApiDataService
Handles all HTTP requests to the myFlix API, including requests for:
- User registration and authentication
- Retreiving move data
- Managing user profiles
- Adding/removing favorite movies

**API Methods**:
  - `userRegistration(userDetails)`
  - `userLogin(userDetails)`
  - `getAllMovies()`
  - `getOneMovie(movieID)`
  - `getUser(userID)`
  - `getUserFavorites(userID)`
  - `addMovieToFavorites(userID, movieID)`
  - `removeMovieFromFavorites(userID, movieID)`
  - `editUser(userID, updatedUserDetails)`
  - `deleteUser(userID)`

### FavoritesService
Manages user's favorites across components using RxJS BehaviorSubject. Ensures user favorites remain syncronized from component to component, whenever they are made. Implementation prevents situations such as changes made to a user's favorites in the UserProfileComponent not displaying in the main movies view without the user taking an action that would result in an API request that would update the displayed favorites. 

