import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  path: any = '';
  signupForm!: FormGroup;
  test: boolean = false;
  imagePreview: any;
  cvPreview: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.path = this.router.url;
    console.log('here path ', this.path);

    this.signupForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(5)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.minLength(5), Validators.maxLength(8)],
      ],
      confirmPassword: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      speciality: ['', [Validators.required]],
      cv: [''],
      img: [''],
      childPhone: ['', [Validators.required]],
    });
    this.addControlsBasedOnPath();
  }

  matchPwd() {
    let pwd = this.signupForm.value.password;
    let confirmPwd = this.signupForm.value.confirmPassword;
    this.test = pwd == confirmPwd;
  }

  signup() {
    console.log('here object', this.signupForm.value);
    if (this.path == '/register') {
      this.signupForm.value.role = 'teacher';
      this.signupForm.value.status = 'invalid';
    } else if (this.path == '/inscription') {
      this.signupForm.value.role = 'student';
    } else if (this.path == '/checkIn') {
      this.signupForm.value.role = 'parent';
    } else {
      this.signupForm.value.role = 'admin';
    }
    this.userService
      .signup(
        this.signupForm.value,
        this.signupForm.value.img,
        this.signupForm.value.cv
      )
      .subscribe((response) => {
        console.log('Here response after signup', response.msg);
      });
  }

  onImageSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const file = (fileInput.files as FileList)[0];
    this.signupForm.patchValue({ img: file });
    this.signupForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onCvSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const file = (fileInput.files as FileList)[0];
    this.signupForm.patchValue({ cv: file });
    this.signupForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.cvPreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  private addControlsBasedOnPath(): void {
    if (this.path === '/inscription') {
      this.signupForm.addControl('img', new FormControl(''));
    } else if (this.path === '/checkIn') {
      this.signupForm.addControl(
        'childPhone',
        new FormControl('', [Validators.required])
      );
    } else if (this.path === '/register') {
      this.signupForm.addControl(
        'speciality',
        new FormControl('', [Validators.required])
      );
      this.signupForm.addControl('cv', new FormControl(''));
    }
  }
}
