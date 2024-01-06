import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-trainers',
  templateUrl: './trainers.component.html',
  styleUrls: ['./trainers.component.css'],
})
export class TrainersComponent implements OnInit {
  teachers: any = [];
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getTeachers().subscribe((res) => {
      console.log('Here response from BE', res.teachers);
      this.teachers = res.teachers;
    });
  }
}
