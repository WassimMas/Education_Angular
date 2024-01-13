import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-courses-table-teacher',
  templateUrl: './courses-table-teacher.component.html',
  styleUrls: ['./courses-table-teacher.component.css'],
})
export class CoursesTableTeacherComponent implements OnInit {
  courses: any = [];
  user: any = {};
  token: any;

  constructor(private courseService: CourseService, private router: Router) {}

  ngOnInit(): void {
    this.token = sessionStorage.getItem('token');
    this.user = this.decodeToken(this.token);
    console.log('here decoded token', this.user);

    this.getCoursesByUserId(this.user.id);
  }

  displayCourse(id: any) {
    this.router.navigate([`courseInfo/${id}`]);
  }

  editCourse(id: any) {
    this.router.navigate([`editCourse/${id}`]);
  }

  deleteCourse(id: any) {
    this.courseService.deleteCourseById(id).subscribe((res) => {
      console.log('here response from BE', res.msg);
      if (res.msg) {
        this.getCoursesByUserId(this.user.id);
      }
    });
  }

  getCoursesByUserId(userId: string) {
    this.courseService.getCoursesByUserId(userId).subscribe((res) => {
      console.log('here response from BE', res.courses);
      this.courses = res.courses;
    });
  }

  decodeToken(token: string) {
    return jwt_decode(token);
  }
}
