import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';

@Component(
	{
		templateUrl: 'register.component.html',
		styleUrls: ['./register.component.css']
	}
)
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    id = 0;
    loggedUser = [];

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authService: AuthService,
        private alertService: AlertService,
        private activatedRoute:ActivatedRoute) { }

    ngOnInit() {

        const lclStorage = JSON.parse(localStorage.getItem('currentUser'));

        this.id = this.activatedRoute.snapshot.paramMap.get("id");
        
        if(lclStorage != null && this.id == null){
            this.router.navigate(['/dashboard']);
        }

        if(lclStorage != null){
            this.loggedUser = lclStorage.message.user;
        }

        this.registerForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });


    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }


        this.loading = true;
        if(this.loggedUser.id){
            this.authService.updateUser(this.loggedUser.id, this.registerForm.value.username,this.registerForm.value.password)
                   
      .subscribe(
          data => {
              this.alertService.success('User updated successfully.', true);
              this.router.navigate(['/dashboard']);
          },
          error => {
              this.alertService.error(error);
              this.loading = false;
          });
        }else{
            this.authService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Registration successful.', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
        }

    }
}