import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeroComponent } from './components/hero/hero.component';
import { FeatureComponent } from './components/feature/feature.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { TrainersComponent } from './components/trainers/trainers.component';
import { EventsComponent } from './components/events/events.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { UserComponent } from './components/user/user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { DashboardTeacherComponent } from './components/dashboard-teacher/dashboard-teacher.component';
import { DashboardStudentComponent } from './components/dashboard-student/dashboard-student.component';
import { CoursesTableComponent } from './components/courses-table/courses-table.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { CourseInfoComponent } from './components/course-info/course-info.component';
import { EditCourseComponent } from './components/edit-course/edit-course.component';
import { CourseComponent } from './components/course/course.component';
import { AddEvaluationComponent } from './components/add-evaluation/add-evaluation.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HeroComponent,
    FeatureComponent,
    RegistrationComponent,
    TrainersComponent,
    EventsComponent,
    SignupComponent,
    HomeComponent,
    LoginComponent,
    SafeUrlPipe,
    DashboardAdminComponent,
    UsersTableComponent,
    UserInfoComponent,
    UserComponent,
    EditUserComponent,
    DashboardTeacherComponent,
    DashboardStudentComponent,
    CoursesTableComponent,
    AddCourseComponent,
    CourseInfoComponent,
    EditCourseComponent,
    CourseComponent,
    AddEvaluationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
