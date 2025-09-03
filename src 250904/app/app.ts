import { Component, inject, signal, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskInterface, TaskModalType } from '../type';
import { TaskGroup } from './task-group/task-group';
import { TaskEditModal } from './task-edit-modal/task-edit-modal';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropList } from '@angular/cdk/drag-drop';
import { Observable } from 'rxjs';
import { TaskService } from '../services/task.service';

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
  /** Firebase init */
  todoList$: Observable<TaskInterface[]>;
  inProgressList$: Observable<TaskInterface[]>;
  doneList$: Observable<TaskInterface[]>;
  todoList = signal<TaskInterface[]>([]);
  inProgressList = signal<TaskInterface[]>([]);
  doneList = signal<TaskInterface[]>([]);

  
  constructor(private taskService: TaskService) {
    /** Gets data from firestore */
    
    // subscribe to task streams
    this.todoList$ = this.taskService.getTasks('todo');
    this.inProgressList$ = this.taskService.getTasks('inprogress');
    this.doneList$ = this.taskService.getTasks('done');

    this.todoList$.subscribe(data => this.todoList.set(data));
    this.inProgressList$.subscribe(data => this.inProgressList.set(data));
    this.doneList$.subscribe(data => this.doneList.set(data));
  }

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


  // helper to find which collection the task belongs to
  private getCollectionName(task: TaskInterface): string {
    if (this.todoList().filter(t => t.id === task.id).length > 0) return 'todo';
    if (this.inProgressList().filter(t => t.id === task.id).length > 0) return 'inprogress';
    if (this.doneList().filter(t => t.id === task.id).length > 0) return 'done';
    return 'todo'; // fallback
  } 

  

  addNewTask(task: TaskInterface) {
    this.todoList.update(list => [...list, task]);
    this.taskService.addTask('todo', task);
  }

  updateTask(updatedTask: TaskInterface) {
    if (!updatedTask.id) return;
    const col = this.getCollectionName(updatedTask);

    const updateList = (listSignal: WritableSignal<TaskInterface[]>) => {
      listSignal.update(list =>
        list.map(task => task === this.taskToEdit ? { ...updatedTask } : task)
      );
    };

    updateList(this.todoList);
    updateList(this.inProgressList);
    updateList(this.doneList);

    this.taskService.updateTask(col, updatedTask);
  }

  deleteTask() {
    if (!this.taskToEdit?.id) return;
    const col = this.getCollectionName(this.taskToEdit);

    this.todoList.update(list => list.filter(task => task !== this.taskToEdit));
    this.inProgressList.update(list => list.filter(task => task !== this.taskToEdit));
    this.doneList.update(list => list.filter(task => task !== this.taskToEdit));

    this.taskService.deleteTask(col, this.taskToEdit.id);
  }

  private getColumnName(listId: string): string | null {
    if (listId === "cdk-drop-list-0") return 'todo';
    if (listId.includes("cdk-drop-list-1")) return 'inprogress';
    if (listId.includes("cdk-drop-list-2")) return 'done';
    return null;
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
      // Firestore update
      
      const task = event.container.data[event.currentIndex];
      const from = this.getColumnName(event.previousContainer.id);
      const to = this.getColumnName(event.container.id);
      if (task && from && to && from !== to) {
        this.taskService.moveTask(task, from, to);
      }
    }
  }

}