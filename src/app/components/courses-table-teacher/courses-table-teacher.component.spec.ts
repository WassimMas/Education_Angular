import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesTableTeacherComponent } from './courses-table-teacher.component';

describe('CoursesTableTeacherComponent', () => {
  let component: CoursesTableTeacherComponent;
  let fixture: ComponentFixture<CoursesTableTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursesTableTeacherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursesTableTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
