
import { Component } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * UserLoginFormComponent handles user login functionality.
 */
@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent {
  // Properties for user credentials
  userData = { Username: '', Password: '' };

  constructor(
    private fetchApiData: FetchApiDataService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  /**
   * Logs in the user by calling the API.
   */

  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((response: any) => {
      localStorage.setItem('user', JSON.stringify(response));
      this.router.navigate(['movies']);
      this.snackBar.open('Login successful', 'OK', {
        duration: 2000
      });
    }, (error: any) => {
      console.error('Login failed', error);
      this.snackBar.open('Login failed', 'OK', {
        duration: 2000
      });
    });
  }
}
