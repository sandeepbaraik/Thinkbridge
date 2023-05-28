import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router, RouterModule } from '@angular/router';
// import {} from '../../../'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formBuilder: any;
  loginForm: any;
  errorMsg: string = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formInit();
  }

  formInit() {
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    });
  }

  login(formVal: any) {
    console.log(formVal);
    this.userService.getUsers().subscribe(res => {
      if(res) {
        let user = res.find((item: any) => item.email == formVal.email)
        if (user && user.password == formVal.password) {
          this.errorMsg = '';
          localStorage.setItem('userDetails', JSON.stringify(user))
          if (user.userType.toLowerCase() == 'admin') {
            this.router.navigate(['admin'])
          } else if (user.userType.toLowerCase() == 'clerk') {
            this.router.navigate(['clerk'])
          } else if (user.userType.toLowerCase() == 'worker') {
            this.router.navigate(['worker'])
          }
        } else {
          console.log('Invalid email or password');
          this.errorMsg = 'Invalid email or password'
        }
      }
    });
  }

  goToRegister() {
    this.router.navigate(['register'])
  }

}
