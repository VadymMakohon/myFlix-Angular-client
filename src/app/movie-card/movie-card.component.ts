import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';
import { MovieDetailsDialogComponent } from '../movie-details-dialog/movie-details-dialog.component';

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
    this.dialog.open(GenreDialogComponent, {
      data: {
        name: movie.Genre.Name,
        description: movie.Genre.Description
      }
    });
  }

  showDirector(movie: any): void {
    this.dialog.open(DirectorDialogComponent, {
      data: {
        name: movie.Director.Name,
        bio: movie.Director.Bio,
        birth: movie.Director.Birth
      }
    });
  }

  showDetail(movie: any): void {
    this.dialog.open(MovieDetailsDialogComponent, {
      data: {
        title: movie.Title,
        description: movie.Description
      }
    });
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

  logout(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }
}
