/** Component for a group of tasks */
import { Component, input, output } from '@angular/core';
import { TaskInterface } from '../../type';
import { Task } from '../task/task';

@Component({
  selector: 'app-task-group',
  imports: [Task],
  templateUrl: './task-group.html',
  styleUrl: './task-group.scss'
})
export class TaskGroup {
  taskList = input<TaskInterface[]>([]);
  showEditTaskModalEvent = output<TaskInterface>();
  showEditTaskModal(task: TaskInterface) {
    this.showEditTaskModalEvent.emit(task);
  }
}
