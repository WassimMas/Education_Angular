import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userUrl: string = 'http://localhost:3000/users';
  constructor(private httpClient: HttpClient) {}
  signup(user: any, img: File, cv: File) {
    let formData = new FormData();
    formData.append('firstName', user.firstName);
    formData.append('lastName', user.lastName);
    formData.append('email', user.email);
    formData.append('password', user.password);
    formData.append('role', user.role);
    formData.append('phone', user.phone);
    formData.append('address', user.address);
    formData.append('speciality', user.speciality);
    formData.append('childPhone', user.childPhone);
    formData.append('img', img);
    formData.append('cv', cv);
    formData.append('status', user.status);

    return this.httpClient.post<{ msg: any }>(
      this.userUrl + '/subscription',
      formData
    );
  }
  login(user: any) {
    return this.httpClient.post<{ msg: string; token: string }>(
      this.userUrl + '/login',
      user
    );
  }
  getUsers() {
    return this.httpClient.get<{ users: any }>(
      `${this.userUrl}/teachers/students`
    );
  }
  getUserById(id: any) {
    return this.httpClient.get<{ user: any }>(`${this.userUrl}/${id}`);
  }
  deleteUserById(id: any) {
    return this.httpClient.delete<{ msg: any }>(`${this.userUrl}/${id}`);
  }
  editUser(obj: any) {
    return this.httpClient.put<{ isUpdated: any }>(this.userUrl, obj);
  }
  getTeachers() {
    return this.httpClient.get<{ teachers: any }>(`${this.userUrl}/teachers`);
  }

  getStudent() {
    return this.httpClient.get<{ students: any }>(`${this.userUrl}/students`);
  }
  getAllTeachersBySpecialty(requestData: {
    specialty: string;
  }): Observable<any> {
    const url = `${this.userUrl}/search-teachers`;

    return this.httpClient.post(url, requestData);
  }
  searchClassesForChild(childPhoneNumber: string): Observable<any> {
    const url = `${this.userUrl}/search-classes-for-child`;
    const body = { childPhoneNumber };

    return this.httpClient.post<{ classes: any }>(url, body);
  }
  searchEvaluationsForChild(childPhoneNumber: string): Observable<any> {
    const url = `${this.userUrl}/search-evaluations-for-child`;
    const body = { childPhoneNumber };
    return this.httpClient.post<{ evaluations: any }>(url, body);
  }
  updateUserStatus(user: any): Observable<any> {
    const url = `${this.userUrl}/status`;
    return this.httpClient.put(url, user);
  }
}
