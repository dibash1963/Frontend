import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ImageComponent } from './components/image/image.component';

const routes: Routes = [
	{
		path : 'login',
		component: LoginComponent
	},
	{
		path : 'register',
		component: RegisterComponent
	},
	{
		path : 'dashboard',
		component: DashboardComponent
	},
	{
		path : 'imageUpload',
		component: ImageComponent
	},
	{
		path : 'user/edit/:id',
		component: RegisterComponent
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
