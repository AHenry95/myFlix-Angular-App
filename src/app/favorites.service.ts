import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * This service is used to manage a user's favorite movies, 
 * and to keep all components in sync with changes made to a user's favorites. 
 */
@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favoritesSubject = new BehaviorSubject<string[]>([]);
  favorites$ = this.favoritesSubject.asObservable();

  updateFavorites(favorites: string[]): void {
    this.favoritesSubject.next(favorites);
  }

  getFavorites(): string[] {
    return this.favoritesSubject.value;
  }
}