// src/app/nav-bar/nav-bar.component.ts
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavbarComponent implements OnInit {
  showHeader: boolean = true;
  user: any = {};

  constructor(private router: Router) {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (val.url === '/welcome') {
          this.showHeader = false;
        } else {
          this.showHeader = true;
          this.user = JSON.parse(localStorage.getItem('user') || '{}');
        }
      }
    });
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || 'null');
  }

  logoutUser(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['welcome']);
  }
}
