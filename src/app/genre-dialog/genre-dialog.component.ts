import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * The GenreDialog component is displayed as part of the MovieCard component.
 * The GenreDialog recieves movie data from the parent MovieCard component;
 * it displays the name and a description of the movie's genre when clicked.   
 */
@Component({
  selector: 'app-genre-dialog',
  standalone: false,
  templateUrl: './genre-dialog.component.html',
  styleUrl: './genre-dialog.component.scss'
})
export class GenreDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      name: string;
      description: string
    }
  ) {}
}