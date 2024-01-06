import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ClassService {
  classUrl: string = 'http://localhost:3000/classes';
  constructor(private httpClient: HttpClient) {}
  getClassById(id: any) {
    return this.httpClient.get<{ class: any }>(`${this.classUrl}/${id}`);
  }

  addClass(obj: any) {
    return this.httpClient.post<{ msg: any }>(this.classUrl, obj);
  }
  getAllClasses() {
    return this.httpClient.get<{ classes: any }>(this.classUrl);
  }
  deleteClassById(id: any) {
    return this.httpClient.delete<{ msg: any }>(`${this.classUrl}/${id}`);
  }
  editClass(obj: any, id: any) {
    return this.httpClient.put<{ msg: any }>(`${this.classUrl}/${id}`, obj);
  }
}
