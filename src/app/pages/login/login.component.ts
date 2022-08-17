import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from "../../services/auth/auth.service";
import { Route, Router } from "@angular/router";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router :Router,
    private authService: AuthService) {
    this.form = this.fb.group({

      'email': ['', Validators.required],
      'password': ['', Validators.required]

    })
  }

  ngOnInit(): void {
  }
  login() {
    const data = this.form.value;
    this.authService.signin(data)
    .subscribe(
      res => {
       if(res.success) {
         localStorage.setItem('token', res.token);
         this.router.navigate(['/profile']);
            alert("login success")

          } else {
            alert(res.message)
          }
        },
        err => {
          alert("login failed")
        }
      )
  }
}
