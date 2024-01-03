import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassTableStudentComponent } from './class-table-student.component';

describe('ClassTableStudentComponent', () => {
  let component: ClassTableStudentComponent;
  let fixture: ComponentFixture<ClassTableStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassTableStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassTableStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
