import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Clerk',
  templateUrl: './Clerk.component.html',
  styleUrls: ['./Clerk.component.css']
})
export class ClerkComponent implements OnInit {

  taskStatus = ['Assigned', 'Ongoing', 'Completed']
  userDetails: any;
  userType: any;
  tasks: any;
  filteredTasks: any;
  p: number = 1;
  
  constructor(
    private userService: UserService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    let user: any = localStorage.getItem('userDetails');
    this.userDetails = JSON.parse(user);
    this.userType = this.userDetails.userType;
    this.getTasks();
  }

  getTasks() {
    this.userService.getTasks().subscribe(res => {
      if (res) {
        this.tasks = res.filter((item: { assignedTo: any; }) => item.assignedTo == this.userDetails.id);
        for (let item of this.tasks) {
          item['edit'] = false
        }
        this.filteredTasks = JSON.parse(JSON.stringify(this.tasks));
      }
    })
  }

  logout() {
    localStorage.clear();
    this.router.navigate([''])
  }

  editTask(task: any) {
    console.log(task);
    this.userService.editTasks(task, task.id).subscribe(res => {
      if (res) {
        this.getTasks();
      }
    })
  }

  search(value: any) {
    if (value != '') {
      value =  String(value).toLowerCase();
      let filteredTasks = [];
      for (let item of this.tasks) {
        if (item['id'] == value || item['taskName'].toLowerCase().includes(value) || item['location'].toLowerCase().includes(value) || item['description'].toLowerCase().includes(value) || item['status'].toLowerCase().includes(value)) {
          filteredTasks.push(item);
        }
      }
      this.filteredTasks = filteredTasks;

    } else {
      this.filteredTasks = JSON.parse(JSON.stringify(this.tasks));
    }
  }

}
