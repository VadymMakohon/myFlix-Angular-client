import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavbarComponent implements OnInit {
  hasFavorites = false;

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.checkFavorites();
  }

  checkFavorites(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.FavoriteMovies && user.FavoriteMovies.length > 0) {
      this.hasFavorites = true;
    }
  }

  logoutUser(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['welcome']);
  }
}
