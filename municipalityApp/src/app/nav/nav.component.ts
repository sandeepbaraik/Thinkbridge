import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
// import {EventEmitter} from "events";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  userDetails: any;
  userType: any;
  @Input() component: any;
  @Output() tabTypeChange = new EventEmitter();
  @Output() searchText = new EventEmitter();
  selectedTab: string = 'tasks';
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    let user: any = localStorage.getItem('userDetails');
    console.log('user: ', user);
    
    this.userDetails = JSON.parse(user);
    this.userType = this.userDetails.userType;
    console.log('userDetails: ', this.userDetails);
    
  }

  tabChange(value:string) {
    this.selectedTab = value;
    this.tabTypeChange.emit(value);
  }

  search(value: any) {
    this.searchText.emit(value);
  }

  logout(){
    localStorage.clear();
    this.router.navigate([''])
  }
}
