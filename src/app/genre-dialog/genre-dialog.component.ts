import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

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