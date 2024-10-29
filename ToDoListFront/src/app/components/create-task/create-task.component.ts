import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { TasksService } from '../../tasks.service';
import { Task } from '../../taskClass';
@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css',
})
export class CreateTaskComponent implements OnInit {
  newTask: Task = {
    name: '',
    status: 'Not Completed',
    id: '',
  };
  constructor(private tasksService: TasksService) {}
  ngOnInit(): void {}

  addTask(): void {
    if (this.newTask.name != '')
      this.tasksService.addTask(this.newTask).subscribe({
        next: () => {
          window.location.reload();
        },
        error: (error) => {},
      });
  }
  cancelTask(): void {
    this.newTask = {
      name: '',
      status: 'Not Completed',
      id: '',
    };
  }
}
