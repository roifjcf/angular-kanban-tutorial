import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskInterface, TaskModalType } from '../type';
import { TaskGroup } from './task-group/task-group';
import { TaskEditModal } from './task-edit-modal/task-edit-modal';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    TaskGroup,
    TaskEditModal,
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

  showModal = false;
  mode: TaskModalType = "new";
  currTaskTitle = "";
  currTaskDescription = "";

  closeModal() {
    this.showModal = false;
  }
  showNewTaskModal() {
    this.showModal = true;
    this.mode = "new";
  }
  showEditTaskModal(task: TaskInterface) {
    this.showModal = true;
    this.mode = "edit";
    this.currTaskTitle = task.title;
    this.currTaskDescription = task.description;
  }
}