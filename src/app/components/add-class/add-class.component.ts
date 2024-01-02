import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ClassService } from 'src/app/services/class.service';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css'],
})
export class AddClassComponent implements OnInit {
  addClassForm!: FormGroup;
  class: any = {
    name: '',
    students: [],
  };
  students: any = [];
  courses: any = [];
  teachers: any = [];
  studentIds: any = [];
  courseId: any;
  teacherId: any;
  constructor(
    private router: Router,
    private userService: UserService,
    private courseService: CourseService,
    private classService: ClassService
  ) {}

  ngOnInit(): void {
    this.userService.getStudent().subscribe((res) => {
      console.log('here response from BE', res.students);
      this.students = res.students;
      this.studentIds = this.students[0]._id;
    });
    this.courseService.getAllCourses().subscribe((res) => {
      console.log('Here response from BE', res.courses);
      this.courses = res.courses;
      this.courseId = this.courses[0]._id;
    });
    this.userService.getTeachers().subscribe((res) => {
      console.log('here response from BE', res.teachers);
      this.teachers = res.teachers;
      this.teacherId = this.teachers[0]._id;
    });
  }
  addClass() {
    console.log('Here object before submitting', this.class);
    const classData = {
      name: this.class.name,
      studentIds: this.studentIds,
      courseId: this.courseId,
      teacherId: this.teacherId,
    };
    this.classService.addClass(classData).subscribe((res) => {
      console.log('here response from BE', res.msg);
      if (res.msg == 'Class added with success') {
        this.router.navigate(['dashboardAdmin']);
      }
    });
  }
  selectStudents(evt: any) {
    if (evt.target.multiple) {
      // Handle multiple selections
      this.studentIds = Array.from(evt.target.selectedOptions).map(
        (option: any) => option.value
      );
    } else {
      // Handle single selection
      this.studentIds = [evt.target.value];
    }

    console.log('Selected student IDs:', this.studentIds);
  }
  selectCourse(evt: any) {
    console.log('here log course evt', evt.target.value);
    this.courseId = evt.target.value;
  }
  selectTeacher(evt: any) {
    console.log('here log course evt', evt.target.value);
    this.teacherId = evt.target.value;
  }
}
