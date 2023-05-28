import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  tasks: any;
  showTasks: boolean = true;
  taskForm: FormGroup | undefined;
  clerks: any;
  priorities = ['Low', 'Medium', 'High']
  filteredTasks: any;
  p: number = 1;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUsers();
    this.formInit();
  }

  getTasks() {
    this.userService.getTasks().subscribe(res => {
      if(res) {
        this.tasks = res; 
        this.showTasks = true;
        for(let item of this.tasks) {
          if(item.assignedTo) {
            let clerk = this.clerks.find((ele: { id: any; }) => ele.id == item.assignedTo);
            if(clerk) {
              item['clerk']= clerk.name;
            }
          }
        }
        this.filteredTasks = JSON.parse(JSON.stringify(this.tasks))
      }
    })
  }
  

  formInit() {
    this.taskForm = new FormGroup({
      taskName: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
      location: new FormControl("", [Validators.required]),
      priority: new FormControl(null),
      assignedTo: new FormControl(null),
    });
  }

  getUsers() {
    this.userService.getUsers().subscribe(res => {
      if (res) {
        this.clerks = res.filter((item: { userType: string; }) => item.userType.toLowerCase() == 'clerk');
        this.getTasks();
      }
    })
  }

  newTask() {
    this.showTasks = false
  }

  addTask(formVal:any) {
    formVal['status'] = 'Assigned';
    this.userService.addTasks(formVal).subscribe(res => {
      if(res) {
        this.getTasks();
      }
    })
  }

  search(value: any) {
    if (value != '') {
      value = String(value).toLowerCase();
      let filteredTasks = [];
      for (let item of this.tasks) {
        if (item['id'] == value || item['taskName'].toLowerCase().includes(value) || item['location'].toLowerCase().includes(value) || item['description'].toLowerCase().includes(value) || item['status'].toLowerCase().includes(value) ) {
          filteredTasks.push(item);
        }
      }
      this.filteredTasks = filteredTasks;

    } else {
      this.filteredTasks = JSON.parse(JSON.stringify(this.tasks));
    }
  }
}
