import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ClerkComponent } from './clerk/clerk.component';
import { WorkerComponent } from './worker/worker.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path:'admin', component:AdminComponent},
  {path:'clerk', component: ClerkComponent},
  {path:'worker', component: WorkerComponent},
  {path: 'login', redirectTo: '', pathMatch: 'full'},
  {path: 'register', component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
