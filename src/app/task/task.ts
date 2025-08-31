/** Component for a task */

import { Component, input } from '@angular/core';
import { TaskInterface } from '../../type';

@Component({
  selector: 'app-task',
  imports: [],
  templateUrl: './task.html',
  styleUrl: './task.scss'
})
export class Task {
  task = input<TaskInterface>();
}
