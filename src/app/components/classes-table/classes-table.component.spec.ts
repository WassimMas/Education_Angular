import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassesTableComponent } from './classes-table.component';

describe('ClassesTableComponent', () => {
  let component: ClassesTableComponent;
  let fixture: ComponentFixture<ClassesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassesTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
