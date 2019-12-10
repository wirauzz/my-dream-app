import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service'
import { Todo } from '../../models/Todo'
import { from } from 'rxjs';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos:Todo[];

  constructor(private todoService:TodoService) { }

  ngOnInit() {
    // this.todos = [
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
    //     completed : true
    //   }
    // ]

    // 2------- this.todos = this.todoService.getTodos();

    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  deleteTodo(todo:Todo){
    // console.log('delete me')


    
    //Remove From UI
    this.todos=this.todos.filter(t => t.id !== todo.id);
    //Remove from server
    this.todoService.deleteTodo(todo).subscribe(); //no retornamos nada no hay paraemtros
  }

  //ADD TODO
  addTodo(todo:Todo) {
    this.todoService.addTodo(todo).subscribe(todo => {
      this.todos.push(todo)});
  }

}
