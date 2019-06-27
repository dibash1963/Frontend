import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  addToDo(todoCategory: string, todoTitle: string, todoDate:string, todoDescription: string){
	var today = new Date().toJSON().slice(0,10).replace(/-/g,'/');
	var tomorrow = new Date(new Date().setDate(new Date().getDate() + 1)).toJSON().slice(0,10).replace(/-/g,'/');;
	
	var storeDate = (todoDate == "TODAY") ? today : tomorrow;

	return this.http.post('http://localhost:3006/v1/addtodo',{
		action: todoCategory, title: todoTitle,
		date: storeDate, description: todoDescription
	});
  }

  fetchToDos(){
  	return this.http.get('http://localhost:3006/v1/todos');
  }

  deleteToDo(id: number){
  	return this.http.post('http://localhost:3006/v1/deleteTodo',{id:id})
  }

  doneToDo(id: number){
    return this.http.post('http://localhost:3006/v1/doneToDo',{id:id})
  }
  
  updateToDo(todoId: number, todoCategory: string, todoTitle: string, todoDate:string, todoDescription: string){
  var today = new Date().toJSON().slice(0,10).replace(/-/g,'/');
  var tomorrow = new Date(new Date().setDate(new Date().getDate() + 1)).toJSON().slice(0,10).replace(/-/g,'/');

  // var incomingDate = new Date(todoDate);
  // var updatedDate = incomingDate.toJSON().slice(0,10).replace(/-/g,'/');
  // console.log(updatedDate)
  
  var storeDate = (todoDate == "TODAY") ? today : ((todoDate == "TOMORROW") ? tomorrow : todoDate);

  return this.http.post('http://localhost:3006/v1/updateToDo',{
    action: todoCategory, title: todoTitle,
    date: storeDate, description: todoDescription, id: todoId
  });
  }
}
