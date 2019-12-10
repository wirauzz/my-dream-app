import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Todo } from 'src/app/models/Todo';
import { TodoService } from '../../services/todo.service'
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo:Todo;

  //Delete
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();

  constructor( private todoService:TodoService ) { }

  ngOnInit() {
  }

  // Introducir Dynamic Classes
  setClasses() {
    let classes = {
      todo:true,'is-complete': this.todo.completed
    }
    return classes
  }

  //Eventos
  onToggle(todo) {
    // console.log('toggle');

    //Toogle in UI
    todo.completed = !todo.completed;

    //Toggle on server
    this.todoService.toggleCompleted(todo).subscribe( todo => console.log(todo));
  }

  onDelete(todo) {
    // console.log('delete');
    this.deleteTodo.emit(todo);
  }

}
