import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';
import { MovieDetailsDialogComponent } from '../movie-details-dialog/movie-details-dialog.component';

@Component({
  selector: 'app-favorite-movies',
  templateUrl: './favorite-movies.component.html',
  styleUrls: ['./favorite-movies.component.scss']
})
export class FavoriteMoviesComponent implements OnInit {
  favoriteMovies: any[] = [];
  user: any = {};

  constructor(
    private fetchApiData: FetchApiDataService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user._id) {
      this.user = user;
      this.getFavoriteMovies();
    } else {
      console.error("User ID is missing. Please log in again.");
    }
  }

  getFavoriteMovies(): void {
    if (this.user._id) {
      this.fetchApiData.getUser(this.user._id).subscribe((response: any) => {
        this.favoriteMovies = response.FavoriteMovies;
      });
    } else {
      console.error("User ID is missing. Please log in again.");
    }
  }

  openGenreDialog(genre: any): void {
    this.dialog.open(GenreDialogComponent, {
      data: { genre }
    });
  }

  openDirectorDialog(director: any): void {
    this.dialog.open(DirectorDialogComponent, {
      data: { director }
    });
  }

  openSynopsisDialog(description: string): void {
    this.dialog.open(MovieDetailsDialogComponent, {
      data: { description }
    });
  }

  isFavorite(movieId: string): boolean {
    return this.favoriteMovies.includes(movieId);
  }

  addFavorite(movieId: string): void {
    if (this.user._id) {
      this.fetchApiData.addFavoriteMovie(this.user._id, movieId).subscribe(() => {
        this.getFavoriteMovies();
      });
    } else {
      console.error("User ID is missing. Please log in again.");
    }
  }

  removeFavorite(movieId: string): void {
    if (this.user._id) {
      this.fetchApiData.deleteFavoriteMovie(this.user._id, movieId).subscribe(() => {
        this.getFavoriteMovies();
      });
    } else {
      console.error("User ID is missing. Please log in again.");
    }
  }
}
