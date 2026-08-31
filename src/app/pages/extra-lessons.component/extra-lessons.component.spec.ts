import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExtraLessonsComponent } from './extra-lessons.component';

describe('ExtraLessonsComponent', () => {
  let component: ExtraLessonsComponent;
  let fixture: ComponentFixture<ExtraLessonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExtraLessonsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExtraLessonsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
