import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any = {};

  constructor(
    private fetchApiData: FetchApiDataService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    const userId = JSON.parse(localStorage.getItem('user')!)._id;
    this.fetchApiData.getUser(userId).subscribe((response: any) => {
      this.user = response;
    });
  }

  updateUser(): void {
    this.fetchApiData.editUser(this.user).subscribe((response: any) => {
      localStorage.setItem('user', JSON.stringify(response));
      this.snackBar.open('Profile updated', 'OK', {
        duration: 2000
      });
    }, (error: any) => {
      this.snackBar.open('Profile update failed', 'OK', {
        duration: 2000
      });
    });
  }

  deleteUser(): void {
    const userId = JSON.parse(localStorage.getItem('user')!)._id;
    this.fetchApiData.deleteUser(userId).subscribe(() => {
      localStorage.clear();
      this.router.navigate(['welcome']);
      this.snackBar.open('Profile deleted', 'OK', {
        duration: 2000
      });
    });
  }
}
