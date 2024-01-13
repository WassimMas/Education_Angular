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

  addCourse(obj: any, img: File) {
    let formData = new FormData();
    formData.append('name', obj.name);
    formData.append('description', obj.description);
    formData.append('duration', obj.duration);
    formData.append('teacher', obj.teacherId);
    formData.append('img', img);
    return this.httpClient.post<{ msg: any }>(this.courseUrl, formData);
  }

  deleteCourseById(id: any) {
    return this.httpClient.delete<{ msg: any }>(`${this.courseUrl}/${id}`);
  }

  editCourse(obj: any) {
    return this.httpClient.put<{ msg: any }>(this.courseUrl, obj);
  }
  getCoursesByUserId(userId: string) {
    return this.httpClient.get<any>(`${this.courseUrl}/user/${userId}`);
  }
}
