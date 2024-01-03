import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClassService } from 'src/app/services/class.service';

@Component({
  selector: 'app-class-info',
  templateUrl: './class-info.component.html',
  styleUrls: ['./class-info.component.css'],
})
export class ClassInfoComponent implements OnInit {
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
}
