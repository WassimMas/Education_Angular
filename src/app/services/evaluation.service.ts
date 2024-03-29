import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EvaluationService {
  evaluationUrl: string = 'http://localhost:3000/evaluations';
  constructor(private httpClient: HttpClient) {}

  addEvaluation(obj: any) {
    return this.httpClient.post<{ msg: any }>(this.evaluationUrl, obj);
  }
  getAllEvaluations() {
    return this.httpClient.get<{ evaluations: any }>(this.evaluationUrl);
  }
  getEvaluationsByUserId(userId: string) {
    return this.httpClient.get<{ evaluations: any }>(
      `${this.evaluationUrl}/student/${userId}`
    );
  }
}
