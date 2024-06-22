import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];

  constructor(private fetchApiData: FetchApiDataService, private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((response: any) => {
      this.movies = response;
    });
  }

  showGenre(movie: any): void {
    // Logic to show genre details
  }

  showDirector(movie: any): void {
    // Logic to show director details
  }

  showDetail(movie: any): void {
    // Logic to show movie details
  }

  toggleFavorite(movie: any): void {
    if (movie.isFavorite) {
      this.fetchApiData.deleteFavoriteMovie(movie._id, movie.Title).subscribe(() => {
        movie.isFavorite = false;
      });
    } else {
      this.fetchApiData.addFavoriteMovie(movie._id, movie.Title).subscribe(() => {
        movie.isFavorite = true;
      });
    }
  }
}