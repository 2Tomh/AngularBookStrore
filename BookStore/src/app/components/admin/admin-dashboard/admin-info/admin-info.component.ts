import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../../services/login.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
@Component({
  selector: 'app-admin-info',
  templateUrl: './admin-info.component.html',
  styleUrls: ['./admin-info.component.css']
})
export class AdminInfoComponent implements OnInit {
  admin: any;
  DB_URL = environment.DB;

  constructor(private loginService: LoginService, private http: HttpClient) { }

  ngOnInit() {
    this.admin = this.loginService.myUser;
  }

  saveAdminChanges() {
    this.http.patch(
      `${this.DB_URL}/users/${this.admin.id}.json?auth=${this.loginService.token}`,
      this.admin
    ).subscribe(() => alert("Admin info saved"));
  }
}
