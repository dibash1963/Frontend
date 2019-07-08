import { Component, ElementRef, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, Headers, RequestOptions } from '@angular/common/http';

import {FormBuilder, FormGroup} from "@angular/forms";

import { TodoService } from '../../services/todo.service';

import { first, map } from 'rxjs/operators';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  selectedFile: File;
  userId;
  user;

  constructor(
    private http: HttpClient,
    private todoService: TodoService) { }

  ngOnInit() {
  	const currentUser = localStorage.getItem('currentUser');

    if(currentUser == null){
      this.router.navigate(['/login']);
    }
    this.user = JSON.parse(currentUser).message.user.username;
    this.userId = JSON.parse(currentUser).message.user.id;
  }

  onImgUpload(){
  		this.selectedFile = event.target.files[0]; 
  }

  onSubmit(){
      this.todoService.uploadImage(this.selectedFile)
      .pipe(first())
      .subscribe(
          data => {
            console.log(data)
          },
          error => {
              this.alertService.error(error);

          });
    }
}
