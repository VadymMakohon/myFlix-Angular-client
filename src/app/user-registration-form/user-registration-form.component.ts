import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  // This is the function responsible for sending the form inputs to the backend
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
      this.dialogRef.close(); // This will close the modal on success!
      this.snackBar.open('user registered successfully!', 'OK', {
        duration: 2000
      });

      // log user in and navigate to movies
      this.fetchApiData.userLogin(this.userData).subscribe((result) => {
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('token', result.token);
        this.router.navigate(['movies']);
      })
    }, (response) => {
      this.snackBar.open(response, 'OK', {
        duration: 2000
      });
    });
  }

}