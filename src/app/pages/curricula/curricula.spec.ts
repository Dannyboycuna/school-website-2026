import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Curricula } from './curricula';

describe('Curricula', () => {
  let component: Curricula;
  let fixture: ComponentFixture<Curricula>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Curricula],
    }).compileComponents();

    fixture = TestBed.createComponent(Curricula);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
