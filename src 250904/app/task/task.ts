/** Component for a task */

import { Component, input, output } from '@angular/core';
import { TaskInterface } from '../../type';
import { CdkDrag } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-task',
  imports: [ CdkDrag ],
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
