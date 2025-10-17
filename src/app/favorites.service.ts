import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Service for managing user favorites state across the application.
 * 
 * @service
 * @providedIn root
 */
@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  /** private Behavior Subject that holds the current favorites state */
  private favoritesSubject = new BehaviorSubject<string[]>([]);
  /** Public observable that components can subscribe to for favorites updates */
  favorites$ = this.favoritesSubject.asObservable();

  /** 
   * Updates the favorites list and notifies all subscribers.
   * 
   * @param favorites - Array of movie IDs representing the user's favorites
   */
  updateFavorites(favorites: string[]): void {
    this.favoritesSubject.next(favorites);
  }

  /**
   * Gets the current favorites list without subscribing to updates.
   * 
   * @returns Array of movie IDs currently in favorites.
   */
  getFavorites(): string[] {
    return this.favoritesSubject.value;
  }
}