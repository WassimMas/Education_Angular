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
  constructor(private userService: UserService, private router: Router) {}

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
}
