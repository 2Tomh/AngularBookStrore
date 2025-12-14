import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../../../../services/login.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-user-discount',
  templateUrl: './user-discount.component.html',
  styleUrls: ['./user-discount.component.css']
})
export class UserDiscountComponent implements OnInit {
  users: any[] = [];
  DB_URL = environment.DB;

  constructor(private http: HttpClient, private loginService: LoginService) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.http.get<any>(`${this.DB_URL}/users.json?auth=${this.loginService.token}`)
      .subscribe(res => {
        this.users = Object.keys(res || {}).map(id => ({ id, ...res[id] }));
      });
  }

  setDiscount(user: any) {
    this.http.patch(
      `${this.DB_URL}/users/${user.id}.json?auth=${this.loginService.token}`,
      { discount: user.newDiscount }
    ).subscribe(() => alert('Discount updated'));
  }

}
