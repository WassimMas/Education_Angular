import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchEvaluationComponent } from './search-evaluation.component';

describe('SearchEvaluationComponent', () => {
  let component: SearchEvaluationComponent;
  let fixture: ComponentFixture<SearchEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchEvaluationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
