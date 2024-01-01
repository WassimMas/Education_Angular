import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-courses-table',
  templateUrl: './courses-table.component.html',
  styleUrls: ['./courses-table.component.css'],
})
export class CoursesTableComponent implements OnInit {
  courses: any = [];
  constructor(private courseService: CourseService, private router: Router) {}

  ngOnInit(): void {
    this.getAllCourses();
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
        this.getAllCourses();
      }
    });
  }

  getAllCourses() {
    this.courseService.getAllCourses().subscribe((res) => {
      console.log('here response from BE', res.courses);
      this.courses = res.courses;
    });
  }
}
