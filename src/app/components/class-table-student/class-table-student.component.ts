import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClassService } from 'src/app/services/class.service';

@Component({
  selector: 'app-class-table-student',
  templateUrl: './class-table-student.component.html',
  styleUrls: ['./class-table-student.component.css'],
})
export class ClassTableStudentComponent implements OnInit {
  classes: any = [];
  constructor(private classService: ClassService, private router: Router) {}

  ngOnInit(): void {
    this.getAllClasses();
  }
  getAllClasses() {
    this.classService.getAllClasses().subscribe((res) => {
      console.log('Here response from BE', res.classes);
      this.classes = res.classes;
    });
  }
  displayClass(id: any) {
    this.router.navigate([`classInfo/${id}`]);
  }
}
