import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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