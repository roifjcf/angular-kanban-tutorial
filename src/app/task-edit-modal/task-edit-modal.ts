import { Component, effect, input, output } from '@angular/core';
import { TaskInterface, TaskModalType } from '../../type';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-edit-modal',
  imports: [FormsModule],
  templateUrl: './task-edit-modal.html',
  styleUrl: './task-edit-modal.scss'
})
export class TaskEditModal {
  mode = input<TaskModalType>("new");
  /** New task */
  newTaskTitle = "";
  newTaskDescription = "";
  /** Existing task */
  currTask = input<TaskInterface>();
  currTaskTitle = this.currTask()?.title ?? "";
  currTaskDescription = this.currTask()?.description ?? "";
  
  constructor() {
    effect(() => {
      const task = this.currTask();
      if (task) {
        this.currTaskTitle = task.title;
        this.currTaskDescription = task.description;
      }
    });
  }

  closeModalEvent = output<boolean>();
  closeModal() {
    this.closeModalEvent.emit(false);
  }

  addNewTaskEvent = output<TaskInterface>();
  addNewTask() {
    this.addNewTaskEvent.emit({
      "id": this.currTask()?.id,
      "title": this.newTaskTitle,
      "description": this.newTaskDescription,
    });
    this.closeModal();
  }

  updateTaskEvent = output<TaskInterface>();
  updateTask() {
    this.updateTaskEvent.emit({
      "id": this.currTask()?.id,
      "title": this.currTaskTitle,
      "description": this.currTaskDescription,
    });
    this.closeModal();
  }

  deleteTaskEvent = output<TaskInterface>();
  deleteTask() {
    const task =  this.currTask();
    if (task) {
      this.deleteTaskEvent.emit(task);
    }
    this.closeModal();
  }
}
