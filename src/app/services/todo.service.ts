import { Injectable } from '@angular/core';
// 
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Todo } from '../models/Todo'
import { from } from 'rxjs';

//put
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  //http
  todosUrl:string = 'https://jsonplaceholder.typicode.com/todos'
  todosLimit:string = '?_limit=5';
  // 'https://jsonplaceholder.typicode.com/todos?_limit=5'

  constructor(private http:HttpClient) { }

  //------GET
  getTodos():Observable<Todo[]> {
    //2--- return this.http.get<Todo[]>(this.todosUrl);     alt+96

    return this.http.get<Todo[]>(`${this.todosUrl}${this.todosLimit}`);

    //1 SIn HTTP-- return [
    //   {
    //     id:1,
    //     title: 'Spiderman',
    //     completed : true
    //   },
    //   {
    //     id:2,
    //     title: 'Spiderman 2',
    //     completed : true
    //   },
    //   {
    //     id:3,
    //     title: 'Spiderman 3',
    //     completed : false
    //   }
    // ]
  }

  //Delete Todo
  deleteTodo(todo:Todo):Observable<Todo> {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.delete<Todo>(url, httpOptions);
  }

    //Add Todo
  addTodo(todo:Todo):Observable<Todo> {
    return this.http.post<Todo>(this.todosUrl, todo, httpOptions);
  }

  //Toggle Completed
  toggleCompleted(todo: Todo):Observable<any> {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.put(url, todo, httpOptions);
  }

}
