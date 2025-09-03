import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  updateDoc,
  deleteDoc,
  doc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { TaskInterface } from '../type';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private firestore = inject(Firestore);

  private getCollection(name: string) {
    return collection(this.firestore, `kanban-${name}`);
  }

  /** Get tasks as observable */
  getTasks(name: string): Observable<TaskInterface[]> {
    return collectionData(this.getCollection(name), { idField: 'id' }) as Observable<TaskInterface[]>;
  }

  /** Add a new task */
  addTask(name: string, task: TaskInterface) {
    return addDoc(this.getCollection(name), {
      "title": task.title,
      "description": task.description
    });
  }

  /** Update a task */
  updateTask(name: string, task: TaskInterface) {
    if (!task.id) return;
    const ref = doc(this.firestore, `kanban-${name}/${task.id}`);
    return updateDoc(ref, {
      title: task.title,
      description: task.description,
    });
  }

  /** Delete a task */
  deleteTask(name: string, taskId: string) {
    const ref = doc(this.firestore, `kanban-${name}/${taskId}`);
    return deleteDoc(ref);
  }

  /** Moves a task to another collection */
  async moveTask(task: TaskInterface, from: string, to: string) {
    if (!task.id) return;
    // delete from old collection
    const oldTask = {...task};
    const oldRef = doc(this.firestore, `kanban-${from}/${task.id}`);
    deleteDoc(oldRef);

    // add to new collection
    addDoc(this.getCollection(to), {
      "title": oldTask.title,
      "description": oldTask.description,
    });
  }
  
}