import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavbarComponent implements OnInit {
  user: any = null;

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || 'null');
  }

  logoutUser(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['welcome']);
  }
}
