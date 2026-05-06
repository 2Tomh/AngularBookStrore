import { Component, OnInit } from '@angular/core'
import { LoginService } from '../../services/login.service'
import { User } from '../../models/user.models'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment'
import { Router } from '@angular/router'
import { Output } from '@angular/core'
import { EventEmitter } from '@angular/core'
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  user!: User
  discount: any[] = []
  DB_URL = environment.DB.trim()
  @Output() closeModal = new EventEmitter<void>();
  isEditModalOpen = false;
  constructor(
    private loginService: LoginService,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    const currentUser = this.loginService.myUser
    if (!currentUser) return
    this.user = { ...currentUser }
    this.loadDiscount(currentUser.id)
  }

  loadDiscount(userId: string): void {
    this.http.get<any>(`${this.DB_URL}/Discount/${userId}`)
      .subscribe(
        (res) => { this.discount = res },
        () => { this.discount = [] }
      )
  }

  saveChanges(): void {
    this.http.put(`${this.DB_URL}/Users/${this.user.id}`, this.user).subscribe(() => {
      this.loginService.updateCurrentUser(this.user);
      this.isEditModalOpen = false
      alert("User updated")
    })
  }


  deleteAccount(): void {
    if (!confirm("Are you sure?")) return
    const userId = this.user.id
    this.http.delete(`${this.DB_URL}/Users/${userId}`).subscribe(() => {
      this.loginService.logout()
    })
  }

  logOut(): void {
    this.loginService.logout()
  }
  onClose() {
    this.closeModal.emit()
  }
}