import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    this.handleFileInput(event, 'img', (result) => {
      this.imagePreview = result;
    });
  }

  onCvSelected(event: Event) {
    this.handleFileInput(event, 'cv', (result) => {
      // Display PDF preview using the result
      this.cvPreview = result;
    });
  }

  private handleFileInput(
    event: Event,
    controlName: string,
    callback: (result: any) => void
  ) {
    const fileInput = event.target as HTMLInputElement;
    const file = (fileInput.files as FileList)[0];

    this.signupForm.patchValue({ [controlName]: file });
    this.signupForm.get(controlName)?.updateValueAndValidity();

    const reader = new FileReader();

    reader.onload = () => {
      callback(reader.result);
    };

    reader.readAsDataURL(file);
  }
}
