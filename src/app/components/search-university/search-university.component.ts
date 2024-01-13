import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UniversityService } from 'src/app/services/university.service';

@Component({
  selector: 'app-search-university',
  templateUrl: './search-university.component.html',
  styleUrls: ['./search-university.component.css'],
})
export class SearchUniversityComponent implements OnInit {
  universityForm!: FormGroup;
  universityResult: any;
  constructor(
    private formBuilder: FormBuilder,
    private universityService: UniversityService
  ) {}

  ngOnInit(): void {
    this.universityForm = this.formBuilder.group({
      cityName: ['', [Validators.required]],
    });
  }
  search() {
    this.universityService
      .searchWeather(this.universityForm.value)
      .subscribe((data) => {
        console.log('here response from api', data);
        this.universityResult = data.result;
      });
  }
}
