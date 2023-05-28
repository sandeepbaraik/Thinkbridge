import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users: any;
  userDetails: any;
  taskTab: boolean = true;
  userType: string = '';
  tabType = 'tasks';
  assignedtasks: any;
  clerks: any;
  p: number = 1;
  @ViewChild(TaskComponent)
  child!: TaskComponent;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    let user: any = localStorage.getItem('userDetails');
    this.userDetails = JSON.parse(user);
    this.userType = this.userDetails.userType;
    this.getUsers();
  }

 getUsers() {
  this.userService.getUsers().subscribe(res =>{
    // if(res) {
      this.users = res.filter((item: { userType: string; }) => item.userType.toLowerCase() == 'clerk');
      this.clerks = JSON.parse(JSON.stringify(this.users))
    // }
  })
 }

 tasks() {
  this.taskTab = true;
 }

 tabChange(value:string){
   console.log(value);
   this.tabType = value;
   
 }

 showAssignedTasks(userId:any) {
  this.userService.getTasks().subscribe(res => {
    if(res) {
      this.assignedtasks = res.filter((item: { assignedTo: any; }) => item.assignedTo == userId);
      console.log('assignedTasks', this.assignedtasks);
      let doc = '<table style="width:100%"><tr><th>Task</th><th>location</th><th>Priority</th><th>Status</th></tr>'
      for(let item of this.assignedtasks) {
        doc+= `<tr><td>${item.taskName}</td><td>${item.location}</td><td>${item.priority}</td><td>${item.status}</td></tr>`
      }
      doc+='</table>'
      Swal.fire({
        title: '<strong><u>Tasks</u></strong>',
        html: doc,
      });
    }
  })
 }

 search(value: any) {
  if(value != '') {
    value = String(value).toLowerCase();
    if(this.tabType == 'clerks') {
      let filteredClerks = [];
      for(let item of this.users) {
        if(item['id'] == value || item['name'].toLowerCase().includes(value) || item['email'].toLowerCase().includes(value) || String(item['phone']).includes(value)) {
          filteredClerks.push(item);
        }
      }
      this.clerks = filteredClerks;
    } else {
      this.child.search(value);
    }
  } else {
    if(this.tabType == 'clerks') {
      this.clerks = JSON.parse(JSON.stringify(this.users));
    } else {
      this.child.search(value);
    }
  } 
 }
}
