import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { TodoService } from '../../services/todo.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  todoForm: FormGroup;
  user;
  t=0;
  classNameActive=false;
  contador=0;
  select_opt=0;
  loading = false;
  submitted = false;
  existingToDos;
  individualToDo =[];

  constructor(
    private formBuilder: FormBuilder,
    private todoService: TodoService,
    private alertService: AlertService
  	private router: Router) { }

  ngOnInit() {
    const currentUser = localStorage.getItem('currentUser');

    if(currentUser == null){
      this.router.navigate(['/login']);
    }
    this.user = JSON.parse(currentUser).message.user.username;

     this.todoForm = this.formBuilder.group({
            todoTitle: ['', Validators.required],
            todoDate: ['', Validators.required],
            todoCategory: ['', Validators.required],
            todoDescription: [null]
        });

     //Fetch the already existing todos
     this.todoService.fetchToDos()
      .pipe(first())
      .subscribe(
          data => {
              var datas = data.map(function (tdo) {
                tdo.date = new Date(tdo.date).toJSON().slice(0,10).replace(/-/g,'/');
                return tdo;
              });
              
              this.existingToDos = data;
          },
          error => {
              this.alertService.error(error);

          });
  }

  // convenience getter for easy access to form fields
    get f() { return this.todoForm.controls; }

  addNewItem(){
    if(this.t % 2 == 0){
     this.classNameActive = true;
   }else{
    this.classNameActive = false;
  }
  this.t++;
}

onSubmit(){
  this.submitted = true;

  // stop here if form is invalid
  if (this.todoForm.invalid){
    return;
  }

  this.loading = true;

  if(this.individualToDo.id){
    this.todoService.updateToDo(this.individualToDo.id, this.f.todoCategory.value, this.f.todoTitle.value, this.f.todoDate.value, this.f.todoDescription.value)
      .pipe(first())
      .subscribe(
          data => {
              this.alertService.success('To-do updated successfully.', true);
              this.router.navigate(['/login']);
          },
          error => {
              this.alertService.error(error);
              this.loading = false;
          });
  }else{
    this.todoService.addToDo(this.f.todoCategory.value, this.f.todoTitle.value, this.f.todoDate.value, this.f.todoDescription.value)
      .pipe(first())
      .subscribe(
          data => {
              this.alertService.success('To-do added successfully.', true);
              this.router.navigate(['/login']);
          },
          error => {
              this.alertService.error(error);
              this.loading = false;
          });
  }
}

editToDo(id){
  this.addNewItem();
  this.submitted = false;
  let toDo = this.existingToDos.filter(function(todo) {
    if(id == todo.id) return todo;
  });

  this.individualToDo = toDo[0];
}

deleteToDo(id){
  this.loading = true;

  this.todoService.deleteToDo(id)
      .pipe(first())
      .subscribe(
          data => {
              this.alertService.success('To-do deleted successfully.', true);
              this.router.navigate(['/login']);
          },
          error => {
              this.alertService.error(error);
              this.loading = false;
          });
}

doneToDo(id){

  this.loading = true;

  this.todoService.doneToDo(id)
      .pipe(first())
      .subscribe(
          data => {
              this.alertService.success(' Marked  successfully.', true);
              this.router.navigate(['/login']);
          },
          error => {
              this.alertService.error(error);
              this.loading = false;
          });

}


}