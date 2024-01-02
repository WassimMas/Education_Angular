import { Component, OnInit } from '@angular/core';
import { ClassService } from 'src/app/services/class.service';

@Component({
  selector: 'app-classes-table',
  templateUrl: './classes-table.component.html',
  styleUrls: ['./classes-table.component.css'],
})
export class ClassesTableComponent implements OnInit {
  classes: any = [];
  constructor(private classService: ClassService) {}

  ngOnInit(): void {
    this.getAllClasses();
  }
  displayClass(id: any) {}
  editClass(id: any) {}
  deleteClass(id: any) {}
  getAllClasses() {
    this.classService.getAllClasses().subscribe((res) => {
      console.log('Here response from BE', res.classes);
      this.classes = res.classes;
    });
  }
}
