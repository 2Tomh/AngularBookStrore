import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { LoginService } from '../../services/login.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userName!: string
  email!: string
  password!: string
  constructor(private router: Router, private loginService:LoginService) { }

  ngOnInit(): void {
  }
  onSubmit(){
    this.loginService.signIn(this.userName,this.email,this.password)
  }

}
