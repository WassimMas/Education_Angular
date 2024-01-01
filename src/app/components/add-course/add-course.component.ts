import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css'],
})
export class AddCourseComponent implements OnInit {
  addCourseForm!: FormGroup;
  teachers: any = [];
  teacherId: any;
  constructor(
    private router: Router,
    private userService: UserService,
    private courseService: CourseService
  ) {}
  course: any = {};
  ngOnInit(): void {
    this.userService.getTeachers().subscribe((response) => {
      console.log('here response from BE', response.teachers);
      this.teachers = response.teachers;
      this.teacherId = this.teachers[0]._id;
    });
  }
  addCourse() {
    console.log(this.course);
    this.course.teacherId = this.teacherId;
    this.courseService.addCourse(this.course).subscribe((response) => {
      console.log('here response from BE', response.msg);
      this.router.navigate(['dashboardTeacher']);
    });
  }
  selectTeacher(evt: any) {
    console.log('here log evt', evt.target.value);
    this.teacherId = evt.target.value;
  }
}
