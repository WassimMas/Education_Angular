import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ClassService {
  classUrl: string = 'http://localhost:3000/classes';
  constructor(private httpClient: HttpClient) {}

  addClass(obj: any) {
    return this.httpClient.post<{ msg: any }>(this.classUrl, obj);
  }
}
