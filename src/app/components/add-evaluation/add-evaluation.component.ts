import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { EvaluationService } from 'src/app/services/evaluation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-evaluation',
  templateUrl: './add-evaluation.component.html',
  styleUrls: ['./add-evaluation.component.css'],
})
export class AddEvaluationComponent implements OnInit {
  studentId: any;
  courseId: any;
  students: any = [];
  courses: any = [];
  addEvaluationForm!: FormGroup;
  evaluation: any = {};
  constructor(
    private router: Router,
    private userService: UserService,
    private courseService: CourseService,
    private evaluationService: EvaluationService
  ) {}

  ngOnInit(): void {
    this.userService.getStudent().subscribe((res) => {
      console.log('here response from BE', res.students);
      this.students = res.students;
      this.studentId = this.students[0]._id;
    });

    this.courseService.getAllCourses().subscribe((res) => {
      console.log('Here response from BE', res.courses);
      this.courses = res.courses;
      this.courseId = this.courses[0]._id;
    });
  }
  addEvaluation() {
    console.log('Here object before submitting', this.evaluation);
    const evaluationData = {
      note: this.evaluation.note,
      evaluation: this.evaluation.evaluation,
      studentId: this.studentId,
      courseId: this.courseId,
    };
    this.evaluationService.addEvaluation(evaluationData).subscribe((res) => {
      console.log('Here response from BE', res.msg);
      if (res.msg == 'Evaluation addedd with success') {
        this.router.navigate(['dashboardTeacher']);
      }
    });
  }

  selectStudent(evt: any) {
    console.log('here log student evt', evt.target.value);
    this.studentId = evt.target.value;
  }
  selectCourse(evt: any) {
    console.log('here log course evt', evt.target.value);
    this.courseId = evt.target.value;
  }
}
