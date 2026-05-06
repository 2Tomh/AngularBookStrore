import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../app/services/login.service'


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  email: string = ''
  password: string = ''

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  loginAdmin() {
    this.loginService.signIn('', this.email, this.password)

    this.loginService.UserChanged.subscribe(user => {
      if (user) {
        if (user.isAdmin) {
          this.router.navigate(['/admin'])
        } else {
          this.loginService.logout()
        }
      }
    })
  }
}