import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search-classes',
  templateUrl: './search-classes.component.html',
  styleUrls: ['./search-classes.component.css'],
})
export class SearchClassesComponent implements OnInit {
  childPhoneNumber: string = '';
  classesForChild: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {}

  searchClassesForChild() {
    // Call your service to search classes for the child
    // Pass parentUserId and childPhoneNumber to your backend
    // Update the below line based on your actual service method
    this.userService.searchClassesForChild(this.childPhoneNumber).subscribe({
      next: (data: any) => {
        this.classesForChild = data.classes;
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
