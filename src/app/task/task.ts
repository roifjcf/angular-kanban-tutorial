/** Component for a task */

import { Component, input, output } from '@angular/core';
import { TaskInterface } from '../../type';

@Component({
  selector: 'app-task',
  imports: [],
  templateUrl: './task.html',
  styleUrl: './task.scss'
})
export class Task {
  task = input<TaskInterface>();
  showEditTaskModalEvent = output<TaskInterface>();
  showEditTaskModal() {
    const currTask = this.task();
    if (currTask) {
      this.showEditTaskModalEvent.emit(currTask);
    }
  }
}
