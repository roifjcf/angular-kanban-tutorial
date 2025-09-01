import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskInterface, TaskModalType } from '../type';
import { TaskGroup } from './task-group/task-group';
import { TaskEditModal } from './task-edit-modal/task-edit-modal';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropList } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    TaskGroup,
    TaskEditModal,
    CdkDropList
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
  
  taskToEdit: TaskInterface | undefined;

  showEditTaskModal(task: TaskInterface) {
    this.showModal = true;
    this.mode = "edit";
    this.taskToEdit = task;
    this.currTaskTitle = task.title;
    this.currTaskDescription = task.description;
  }


  addNewTask(task: TaskInterface) { this.todoList.push(task); }
  updateTask(task: TaskInterface) {
    const updateList = (list: TaskInterface[]) => 
      list.map(oldTask => oldTask === this.taskToEdit ? {...task} : oldTask);
    
    this.todoList = updateList(this.todoList);
    this.inProgressList = updateList(this.inProgressList);
    this.doneList = updateList(this.doneList);
  }
  deleteTask() {
    this.todoList = this.todoList.filter(oldTask => oldTask !== this.taskToEdit);
    this.inProgressList = this.inProgressList.filter(oldTask => oldTask !== this.taskToEdit);
    this.doneList = this.doneList.filter(oldTask => oldTask !== this.taskToEdit);
  }

  drop(event: CdkDragDrop<TaskInterface[]>) {
    // runs when the drop event finished
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}