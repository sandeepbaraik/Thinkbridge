import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formBuilder: any;
  registerForm: any;
  errorMsg: string = '';
  userTypes:any = ['Clerk', 'Worker']

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formInit();
  }

  formInit() {
    this.registerForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
      phone: new FormControl("", [Validators.required]),
      userType: new FormControl(null),
    });
  }

  register(formVal: any) {
    console.log(formVal);
    this.userService.getUsers().subscribe(userRes => {
      if(userRes) {
        // let user = userRes.length > 0 ? userRes[userRes.length -1].id : 0;
        // formVal['id'] = user.id + 1;
        this.userService.addUsers(formVal).subscribe(res => {
          if(res) {
            this.router.navigate(['login']);
          }
        })
      }
    })
    
  }
  gotToLogin() {
    this.router.navigate(['login'])
  }
}
