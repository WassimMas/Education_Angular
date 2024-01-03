import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EvaluationService } from 'src/app/services/evaluation.service';

@Component({
  selector: 'app-evaluations-table',
  templateUrl: './evaluations-table.component.html',
  styleUrls: ['./evaluations-table.component.css'],
})
export class EvaluationsTableComponent implements OnInit {
  evaluations: any = [];
  constructor(
    private router: Router,
    private evaluationService: EvaluationService
  ) {}

  ngOnInit(): void {
    this.evaluationService.getAllEvaluations().subscribe((res) => {
      console.log('Here response from BE', res.evaluations);
      this.evaluations = res.evaluations;
    });
  }
  displayEvaluation(id: any) {
    this.router.navigate([`evaluationInfo/${id}`]);
  }
}
