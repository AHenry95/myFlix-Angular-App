import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Dialog component for displaying genre information.
 * 
 * The GenreDialog component is displayed as part of the MovieCard component.
 * The GenreDialog recieves movie data from the parent MovieCard component, and 
 * it displays the name and a description of the movie's genre when clicked.
 * 
 * @component
 * @selector app-genre-dialog   
 */
@Component({
  selector: 'app-genre-dialog',
  standalone: false,
  templateUrl: './genre-dialog.component.html',
  styleUrl: './genre-dialog.component.scss'
})
export class GenreDialogComponent {
  /**
   * Creates an instance of the GenreDialogComponent.
   * 
   * @param data - The genre information to display
   * @param data.name - The name of the genre
   * @param data.description - A detailed description of the genre
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      name: string;
      description: string
    }
  ) {}
}