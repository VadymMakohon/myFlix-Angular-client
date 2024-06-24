import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  favoriteMovies: any[] = [];
  profileForm: FormGroup;

  constructor(
    private fetchApiData: FetchApiDataService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.profileForm = this.formBuilder.group({
      Username: ['', Validators.required],
      Password: ['', [Validators.required, Validators.minLength(8)]],
      Email: ['', [Validators.required, Validators.email]],
      Birthdate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.fetchApiData.getUser(user._id).subscribe((response: any) => {
      this.user = response;
      this.profileForm.setValue({
        Username: this.user.Username,
        Password: '',
        Email: this.user.Email,
        Birthdate: this.user.Birthdate.slice(0, 10)
      });
      this.getFavoriteMovies();
    });
  }

  getFavoriteMovies(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.fetchApiData.getUser(user._id).subscribe((response: any) => {
      this.favoriteMovies = response.FavoriteMovies;
    });
  }

  updateUser(): void {
    this.fetchApiData.editUser(this.profileForm.value).subscribe((response: any) => {
      this.snackBar.open('Profile updated successfully', 'OK', {
        duration: 2000
      });
      localStorage.setItem('user', JSON.stringify(response));
    });
  }

  deleteUser(): void {
    this.fetchApiData.deleteUser(this.user._id).subscribe(() => {
      this.snackBar.open('Profile deleted successfully', 'OK', {
        duration: 2000
      });
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      window.location.reload();
    });
  }
}
