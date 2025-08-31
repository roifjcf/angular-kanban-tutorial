import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskInterface } from '../type';
import { TaskGroup } from './task-group/task-group';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    TaskGroup
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('angular-kanban-tutorial');

  todoList: TaskInterface[] = [
    { "title": "todo task 1", "description": "todo task 1 description", },
    { "title": "todo task 2", "description": "todo task 2 description", },
    { "title": "todo task 3", "description": "todo task 3 description", }
  ];
  inProgressList: TaskInterface[] = [
    { "title": "in-progress task 1", "description": "in-progress task 1 description", },
    { "title": "in-progress task 2", "description": "in-progress task 2 description", },
  ];
  doneList: TaskInterface[] = [
    { "title": "finished task 1", "description": "finished task 1 description", },
  ];
}