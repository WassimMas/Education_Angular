import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: any = {};
  errorMsg: any = '';
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  Login() {
    console.log(this.user);
    this.userService.login(this.user).subscribe((data) => {
      console.log('Here data after login', data.msg, data.token);

      if (data.token) {
        // Save token into Session Storage
        sessionStorage.setItem('token', data.token);
        let user: any = this.decodeToken(data.token);
        console.log('here token decoded', user);

        if (user.role == 'teacher' && user.status == 'valid') {
          this.router.navigate(['dashboardTeacher']);
        } else if (user.role == 'admin') {
          this.router.navigate(['dashboardAdmin']);
        } else if (user.role == 'student') {
          this.router.navigate(['dashboardStudent']);
        } else if (user.role == 'parent') {
          this.router.navigate(['']);
        }
      } else {
        this.errorMsg = 'Please check phone or email and pwd';
      }
    });
  }
  decodeToken(token: string) {
    return jwt_decode(token);
  }
}
