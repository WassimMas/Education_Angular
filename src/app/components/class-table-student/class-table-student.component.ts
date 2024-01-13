import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClassService } from 'src/app/services/class.service';
import jwt_decode from 'jwt-decode';
import { EvaluationService } from 'src/app/services/evaluation.service';

@Component({
  selector: 'app-class-table-student',
  templateUrl: './class-table-student.component.html',
  styleUrls: ['./class-table-student.component.css'],
})
export class ClassTableStudentComponent implements OnInit {
  classes: any = [];
  user: any;
  token: any = {};
  evaluations: any = [];
  constructor(
    private classService: ClassService,
    private router: Router,
    private evaluationService: EvaluationService
  ) {}

  ngOnInit(): void {
    this.token = sessionStorage.getItem('token');
    this.user = this.decodeToken(this.token);
    this.getClassesByUserId(this.user.id);
  }
  getClassesByUserId(userId: string) {
    this.classService.getClassesByUserId(userId).subscribe((res) => {
      console.log('Here response from BE', res.classes);
      this.classes = res.classes;
    });
  }
  displayClass(id: any) {
    this.router.navigate([`classInfo/${id}`]);
  }
  decodeToken(token: string) {
    return jwt_decode(token);
  }
  getEvaluationsByUserId(userId: any) {
    this.evaluationService
      .getEvaluationsByUserId(userId)
      .subscribe((res: any) => {
        console.log('Here response from BE', res.evaluations);
        this.evaluations = res.evaluations;
      });
  }
}
