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
    this.showEditTaskModalEvent.emit({
      title: this.task()?.title ?? "",
      description: this.task()?.description ?? "",
    });
  }
}
