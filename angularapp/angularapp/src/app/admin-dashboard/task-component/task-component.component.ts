import { Component ,OnInit} from '@angular/core';
import { AdminDashboardService } from 'src/app/admin-dashboard.service';
@Component({
  selector: 'app-task-component',
  templateUrl: './task-component.component.html',
  styleUrls: ['./task-component.component.css']
})


export class TaskComponentComponent implements OnInit {
  tasks: any[] = [];
  newTask: any = {};
  showForm: boolean = false;

  constructor(private adminService: AdminDashboardService) {}

  ngOnInit(): void {
    this.getAllTasks();
  }

  getAllTasks(): void {
    this.adminService.getAllTasks()
      .subscribe(tasks => this.tasks = tasks);
  }

  createTask(): void {
    this.adminService.createTask(this.newTask)
      .subscribe(task => {
        this.tasks.push(task);
        this.newTask = {};
      });
  }

  deleteTask(id: number): void {
    this.adminService.deleteTask(id)
      .subscribe(() => {
        this.tasks = this.tasks.filter(task => task.id !== id);
      });
  }

  toggleFormVisibility(): void {
    this.showForm = !this.showForm;
  }
}
