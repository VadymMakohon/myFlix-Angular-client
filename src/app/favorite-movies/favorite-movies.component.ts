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

  constructor(private fetchApiData: FetchApiDataService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getFavoriteMovies();
  }

  getFavoriteMovies(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.fetchApiData.getUser(user.Username).subscribe((response: any) => {
      this.favoriteMovies = response.FavoriteMovies;
    });
  }

  /**
   * Open genre dialog
   * @param genre The genre object
   */
  openGenreDialog(genre: any): void {
    this.dialog.open(GenreDialogComponent, {
      data: { genre }
    });
  }

  /**
   * Open director dialog
   * @param director The director object
   */
  openDirectorDialog(director: any): void {
    this.dialog.open(DirectorDialogComponent, {
      data: { director }
    });
  }

  /**
   * Open synopsis dialog
   * @param description The movie description
   */
  openSynopsisDialog(description: string): void {
    this.dialog.open(MovieDetailsDialogComponent, {
      data: { description }
    });
  }
}
