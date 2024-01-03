import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClassService } from 'src/app/services/class.service';

@Component({
  selector: 'app-classes-table',
  templateUrl: './classes-table.component.html',
  styleUrls: ['./classes-table.component.css'],
})
export class ClassesTableComponent implements OnInit {
  classes: any = [];
  constructor(private classService: ClassService, private router: Router) {}

  ngOnInit(): void {
    this.getAllClasses();
  }
  displayClass(id: any) {
    this.router.navigate([`classInfo/${id}`]);
  }
  editClass(id: any) {
    this.router.navigate([`editClass/${id}`]);
  }
  deleteClass(id: any) {
    this.classService.deleteClassById(id).subscribe((res) => {
      console.log('here response from BE', res.msg);
      if (res.msg == 'Deleted with success') {
        this.getAllClasses();
      }
    });
  }
  getAllClasses() {
    this.classService.getAllClasses().subscribe((res) => {
      console.log('Here response from BE', res.classes);
      this.classes = res.classes;
    });
  }
}
