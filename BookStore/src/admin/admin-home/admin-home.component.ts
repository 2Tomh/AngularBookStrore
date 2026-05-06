import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../app/services/login.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }
  onLogOut() {
    this.loginService.logout();
  }
}
