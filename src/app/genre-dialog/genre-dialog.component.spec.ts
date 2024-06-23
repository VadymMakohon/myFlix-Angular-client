import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreDialogComponent } from './genre-dialog.component';

describe('GenreDialogComponent', () => {
  let component: GenreDialogComponent;
  let fixture: ComponentFixture<GenreDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenreDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenreDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
