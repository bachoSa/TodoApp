import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { TasksService } from '../../tasks.service';
import { Task } from '../../taskClass';
@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
})
export class TasksListComponent implements OnInit {
  tasks: Task[] = [];
  constructor(private tasksService: TasksService) {}
  ngOnInit(): void {
    this.fetchAllTask();
  }
  fetchAllTask():void {
    this.tasksService.fetchAllTasks().subscribe({
      next: (data) => {
        this.tasks = data;
      },
      error: (error) => console.log('Error while fetching tasks', error),
    });
  }
  updateTask(task: Task): void {
    this.tasksService.updateTask(task.id, task).subscribe({
      next: () => {
        this.fetchAllTask();
      },
      error: (error) => {
        console.log('error while updating task', error);
      },
    });
  }
  deleteTask(id: string): void {
    this.tasksService.deleteTask(id).subscribe({
      next: () => {
        this.fetchAllTask();
      },
      error: (error) => {
        console.log('Error while deleting task', error);
      },
    });
  }

  toggleStatus(task: Task): void {
    task.status = task.status === 'Completed' ? 'Not Completed' : 'Completed';
    this.updateTask(task);
  }
}
