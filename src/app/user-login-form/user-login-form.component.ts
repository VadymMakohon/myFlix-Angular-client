import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void { }

  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (result) => {
        console.log(result);
        localStorage.setItem('user', JSON.stringify(result));
        this.dialogRef.close();
        this.snackBar.open('Logged in successfully!', 'OK', {
          duration: 2000
        });
      },
      (result) => {
        console.log(result);
        this.snackBar.open('Login failed. Please try again.', 'OK', {
          duration: 2000
        });
      }
    );
  }
}
