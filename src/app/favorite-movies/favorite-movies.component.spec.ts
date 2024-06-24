import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteMoviesComponent } from './favorite-movies.component';

describe('FavoriteMoviesComponent', () => {
  let component: FavoriteMoviesComponent;
  let fixture: ComponentFixture<FavoriteMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoriteMoviesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoriteMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
