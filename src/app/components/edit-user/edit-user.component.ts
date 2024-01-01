import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  editUserForm!: FormGroup;
  user: any = {};
  id: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.userService.getUserById(this.id).subscribe((result) => {
      console.log('here result from BE', result);
      this.user = result.user;
    });
  }
  editUser() {
    console.log('Here the new user', this.user);
    this.userService.editUser(this.user).subscribe((res) => {
      console.log('here response from BE', res.isUpdated);
      if (res.isUpdated) {
        this.router.navigate(['dashboardAdmin']);
      }
    });
  }
}
