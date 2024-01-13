import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchUniversityComponent } from './search-university.component';

describe('SearchUniversityComponent', () => {
  let component: SearchUniversityComponent;
  let fixture: ComponentFixture<SearchUniversityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchUniversityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchUniversityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
