import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search-teacher',
  templateUrl: './search-teacher.component.html',
  styleUrls: ['./search-teacher.component.css'],
})
export class SearchTeacherComponent implements OnInit {
  specialty: string = '';
  allTeachers: any = [];
  private searchSubscription: Subscription | undefined;
  constructor(private userService: UserService) {}

  ngOnInit(): void {}
  searchTeachers() {
    if (!this.specialty) {
      console.error('Specialty is required');
      return;
    }

    const requestData = { specialty: this.specialty };

    this.userService.getAllTeachersBySpecialty(requestData).subscribe(
      (data) => {
        this.allTeachers = data;
      },
      (error) => {
        console.error('Error:', error);
        // Handle error appropriately
      }
    );
  }

  ngOnDestroy() {
    // Unsubscribe from the search subscription when the component is destroyed
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }
}
