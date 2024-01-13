import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardTeacherComponent } from './components/dashboard-teacher/dashboard-teacher.component';
import { DashboardStudentComponent } from './components/dashboard-student/dashboard-student.component';
import { CoursesTableComponent } from './components/courses-table/courses-table.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { CourseInfoComponent } from './components/course-info/course-info.component';
import { EditCourseComponent } from './components/edit-course/edit-course.component';
import { AddEvaluationComponent } from './components/add-evaluation/add-evaluation.component';
import { AddClassComponent } from './components/add-class/add-class.component';
import { ClassInfoComponent } from './components/class-info/class-info.component';
import { EditClassComponent } from './components/edit-class/edit-class.component';
import { EvaluationInfoComponent } from './components/evaluation-info/evaluation-info.component';
import { SearchTeacherComponent } from './components/search-teacher/search-teacher.component';
import { SearchClassesComponent } from './components/search-classes/search-classes.component';
import { SearchEvaluationComponent } from './components/search-evaluation/search-evaluation.component';
import { SearchUniversityComponent } from './components/search-university/search-university.component';

const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'register', component: SignupComponent },
  { path: 'inscription', component: SignupComponent },
  { path: 'checkIn', component: SignupComponent },
  { path: '', component: HomeComponent },
  { path: 'dashboardAdmin', component: DashboardAdminComponent },
  { path: 'userInfo/:id', component: UserInfoComponent },
  { path: 'editUser/:id', component: EditUserComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboardTeacher', component: DashboardTeacherComponent },
  { path: 'dashboardStudent', component: DashboardStudentComponent },
  { path: 'coursesTable', component: CoursesTableComponent },
  { path: 'addCourse', component: AddCourseComponent },
  { path: 'courseInfo/:id', component: CourseInfoComponent },
  { path: 'editCourse/:id', component: EditCourseComponent },
  { path: 'addEvaluation', component: AddEvaluationComponent },
  { path: 'addClass', component: AddClassComponent },
  { path: 'classInfo/:id', component: ClassInfoComponent },
  { path: 'editClass/:id', component: EditClassComponent },
  { path: 'evaluationInfo/:id', component: EvaluationInfoComponent },
  { path: 'searchTeacher', component: SearchTeacherComponent },
  { path: 'searchClass', component: SearchClassesComponent },
  { path: 'searchEvaluation', component: SearchEvaluationComponent },
  { path: 'searchUniversity', component: SearchUniversityComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
