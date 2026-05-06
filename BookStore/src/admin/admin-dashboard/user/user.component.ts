import { Component, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { LoginService } from '../../../app/services/login.service'
import { environment } from '../../../environments/environment'
import { HttpHeaders } from '@angular/common/http'
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: any[] = []
  DB_URL = environment.DB

  constructor(private http: HttpClient, private loginService: LoginService) { }

  ngOnInit() {
    this.loadUsers()
  }

  loadUsers() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.loginService.token}`
    });
    this.http.get<any[]>(`${this.DB_URL}/Users/all-users`, { headers }).subscribe({
      next: (res) => {
        console.log("Success! Data received:", res);
        this.users = res;
      },
      error: (err) => {
        console.error("Still getting 401? Check if token is valid:", err);
        console.log("Token value:", this.loginService.token);
      }
    });
  }

  updateUserRole(user: any) {
    this.http.put(`${this.DB_URL}/Users/${user.id}`, user).subscribe({
      next: () => alert(`User ${user.userName} updated to ${user.role}`),
      error: (err) => {
        console.error("update failed", err)
        this.loadUsers()
      }
    })
  }
  deleteUser(id: number) {
    if (confirm("Are you sure you want to delete this user?")) {
      this.http.delete(`${this.DB_URL}/Users/${id}`).subscribe({
        next: () => {
          alert("User deleted successfully");
          this.loadUsers();
        },
        error: (err) => console.error("Delete failed", err)
      })
    }
  }
}
