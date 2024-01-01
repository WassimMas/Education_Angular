import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css'],
})
export class EditCourseComponent implements OnInit {
  course: any = {};
  id: any;
  constructor(
    private courseService: CourseService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.courseService.getCourseById(this.id).subscribe((res) => {
      console.log('Here response from BE', res.course);
      this.course = res.course;
    });
  }
  editCourse() {
    console.log('here the new course', this.course);
    this.courseService.editCourse(this.course).subscribe((res) => {
      console.log('here response from BE', res.msg);
      if ((res.msg = 'is updated')) {
        this.router.navigate(['dashboardTeacher']);
      }
    });
  }
}
