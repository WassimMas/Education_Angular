import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css'],
})
export class AddCourseComponent implements OnInit {
  addCourseForm!: FormGroup;
  teachers: any = [];
  teacherId: any;
  imagePreview: any;
  course: any = {};
  img: any;
  user: any = {};
  token: any;
  constructor(
    private router: Router,
    private userService: UserService,
    private courseService: CourseService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.userService.getTeachers().subscribe((response) => {
      console.log('here response from BE', response.teachers);
      this.teachers = response.teachers;
      // Find the teacher with the user's ID
      const userTeacher = this.teachers.find(
        (teacher: any) => teacher._id === this.user.id
      );
      this.teacherId = userTeacher ? userTeacher._id : null;
    });
    this.addCourseForm = this.fb.group({
      img: [''],
    });
    this.token = sessionStorage.getItem('token');
    this.user = this.decodeToken(this.token);
    console.log('the user information', this.user);
  }
  addCourse() {
    // Ensure teacherId is defined before proceeding
    if (!this.teacherId) {
      console.error('teacherId is undefined');
      // Handle the error or notify the user appropriately
      return;
    }

    console.log(this.course);
    this.course.teacherId = this.teacherId;

    this.courseService.addCourse(this.course, this.img).subscribe(
      (response) => {
        console.log('here response from BE', response.msg);
        this.router.navigate(['dashboardTeacher']);
      },
      (error) => {
        console.error('Error from BE', error);
        // Handle the error appropriately (e.g., display a user-friendly message)
      }
    );
  }
  selectTeacher(evt: any) {
    console.log('here log evt', evt.target.value);
    this.teacherId = evt.target.value;
  }
  onImageSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    // const file = (fileInput.files as FileList)[0];
    const files = fileInput.files;

    if (files && files.length > 0) {
      const file = files[0];
      this.img = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  decodeToken(token: string) {
    return jwt_decode(token);
  }
}
