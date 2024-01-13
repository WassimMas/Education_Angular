import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchClassesComponent } from './search-classes.component';

describe('SearchClassesComponent', () => {
  let component: SearchClassesComponent;
  let fixture: ComponentFixture<SearchClassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchClassesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
