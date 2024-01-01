import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  courseUrl: string = 'http://localhost:3000/courses';
  constructor(private httpClient: HttpClient) {}

  getAllCourses() {
    return this.httpClient.get<{ courses: any }>(this.courseUrl);
  }

  getCourseById(id: any) {
    return this.httpClient.get<{ course: any }>(`${this.courseUrl}/${id}`);
  }

  addCourse(obj: any) {
    return this.httpClient.post<{ msg: any }>(this.courseUrl, obj);
  }

  deleteCourseById(id: any) {
    return this.httpClient.delete<{ msg: any }>(`${this.courseUrl}/${id}`);
  }

  editCourse(obj: any) {
    return this.httpClient.put<{ msg: any }>(this.courseUrl, obj);
  }
}
