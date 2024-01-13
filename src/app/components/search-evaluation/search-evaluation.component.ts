import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search-evaluation',
  templateUrl: './search-evaluation.component.html',
  styleUrls: ['./search-evaluation.component.css'],
})
export class SearchEvaluationComponent implements OnInit {
  childPhoneNumber: string = '';
  evaluations: any = [];
  constructor(private userService: UserService) {}

  ngOnInit(): void {}
  searchEvaluationsForChild() {
    this.userService
      .searchEvaluationsForChild(this.childPhoneNumber)
      .subscribe({
        next: (data: any) => {
          this.evaluations = data.evaluations;
        },
        error: (error) => {
          console.error('Error:', error);
          // Handle error appropriately
        },
        complete: () => {
          // Optionally handle completion
        },
      });
  }
}
