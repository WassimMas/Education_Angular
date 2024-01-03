import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ClassService } from 'src/app/services/class.service';

@Component({
  selector: 'app-edit-class',
  templateUrl: './edit-class.component.html',
  styleUrls: ['./edit-class.component.css'],
})
export class EditClassComponent implements OnInit {
  editClassForm!: FormGroup;
  class: any = {};
  id: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private classService: ClassService
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.classService.getClassById(this.id).subscribe((res) => {
      console.log('Here response from BE', res.class);
      this.class = res.class;
    });
  }
  editClass() {}
}
