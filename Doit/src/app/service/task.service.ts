import { Injectable } from '@angular/core';
import { Task } from '../interface/task';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  [x: string]: any;
  Tasks: Task[] = [];
  TaskCounter = 0;
  constructor(
    private storage: Storage) { }

  getTasks(): Promise<Task[]> {
    this.storage.get('TaskCounter').then(
      data => this.TaskCounter = data
    );
    return this.storage.get('Tasks').then(
      data => {
        if (data) {
          this.Tasks = this.priorityTasks(data);
        }
        return data;
      }
    );
  }

  saveTask(t): Promise<Task[]> {
    this.Tasks[this.Tasks.findIndex(task => task.id === t.id)] = t;

    return this.storage.set('Tasks', this.Tasks);
  }

  newTask(t): Promise<Task[]> {
    this.Tasks.push(t);
    this.TaskCounter++;

    return this.storage.set('Tasks', this.Tasks).then(
      () => this.storage.set('TaskCounter', this.TaskCounter)
    );
  }

  deleteTask(id: number): Promise<Task[]> {
    this.Tasks = this.Tasks.filter(t => t.id !== id);
    return this.storage.set('Tasks', this.Tasks);
  }

  getTaskById(id: number): Task {
    return this.Tasks.find(t => t.id === id);
  }
}
