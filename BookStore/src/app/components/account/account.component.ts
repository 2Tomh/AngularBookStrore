import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service'
import { User } from '../../models/user.models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  // מחזיק את פרטי המשתמש המחובר (userName, email, password)
  user!: User
  discount: any[] = []
  DB_URL = environment.DB.trim()

  constructor(
    private loginService: LoginService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    const currentUser = this.loginService.myUser
    if (!currentUser) return
    this.user = { ...currentUser }
    this.loadDiscount(currentUser.id)
  }

  loadDiscount(userId: string): void {

    const token = this.loginService.token;

    this.http.get<any>(`${this.DB_URL}/discount/${userId}.json?auth=${token}`)
      .subscribe(
        (res) => {
          this.discount = res ? Object.values(res) : [];
        },
        () => {
          this.discount = [];
        }
      );
  }

  saveChanges(): void {
    const token = this.loginService.token;
    const userId = this.user.id;

    const updatedUserData = {
      userName: this.user.userName,
      email: this.user.email,
      password: this.user.password,
      isAdmin: this.user.isAdmin
    };

    this.http.patch(
      `${this.DB_URL}/users/${userId}.json?auth=${token}`, updatedUserData).subscribe(() => {
        alert("user updated");
      });
  }


  deleteAccount(): void {
    if (!confirm('Are you sure you want to delte your account')) return

    const token = this.loginService.token
    const userId = this.user.id

    this.http.delete(
      `${this.DB_URL}/users/${userId}.json?auth=${token}`
    ).subscribe(() => {
      this.loginService.logOut()
    })
  }

  logOut(): void {
    this.loginService.logOut()
  }
}
