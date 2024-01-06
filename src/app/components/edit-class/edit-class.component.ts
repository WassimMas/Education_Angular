import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ClassService } from 'src/app/services/class.service';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-class',
  templateUrl: './edit-class.component.html',
  styleUrls: ['./edit-class.component.css'],
})
export class EditClassComponent implements OnInit {
  editClassForm!: FormGroup;
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
  id: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private classService: ClassService,
    private userService: UserService,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.classService.getClassById(this.id).subscribe((res) => {
      console.log('Here response from BE', res.class);
      this.class = res.class;
    });
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
  editClass() {
    console.log('Here object before submitting', this.class);
    const classData = {
      name: this.class.name,
      studentIds: this.studentIds,
      courseId: this.courseId,
      teacherId: this.teacherId,
    };
    this.classService.editClass(classData, this.id).subscribe((res) => {
      console.log('Here response from BE', res.msg);
    });
  }
}
