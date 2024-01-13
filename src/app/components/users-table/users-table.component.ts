import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css'],
})
export class UsersTableComponent implements OnInit {
  users: any = [];
  constructor(
    private userService: UserService,
    private router: Router,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
  }
  displayUser(id: any) {
    this.router.navigate([`userInfo/${id}`]);
  }
  editUser(id: any) {
    this.router.navigate([`editUser/${id}`]);
  }
  deleteUser(id: any) {
    this.userService.deleteUserById(id).subscribe((res) => {
      console.log('here response from BE', res.msg);
      if (res.msg) {
        this.getAllUsers();
      }
    });
  }
  getAllUsers() {
    this.userService.getUsers().subscribe((response: any) => {
      console.log('here response from BE', response.users);
      this.users = response.users;
    });
  }
  changeUserStatus(user: any) {
    console.log('here user', user);

    const newStatus = user.status === 'valid' ? 'invalid' : 'valid';
    user.status = newStatus;

    // Call the updateUserStatus method in the service
    this.userService.updateUserStatus(user).subscribe({
      next: (response) => {
        console.log('User status updated successfully', response);
        // Optionally, update your local users array or trigger a refresh
      },
      error: (error) => {
        console.error('Error updating user status:', error);
      },
    });
  }
}
