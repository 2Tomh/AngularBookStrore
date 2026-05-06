import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core'
import { LoginService } from '../../../app/services/login.service'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment'
@Component({
  selector: 'app-admin-info',
  templateUrl: './admin-info.component.html',
  styleUrls: ['./admin-info.component.css']
})
export class AdminInfoComponent implements OnInit {
  @Output() closeModal = new EventEmitter<void>()
  @Input() isEditMode: boolean = false;
  admin: any
  DB_URL = environment.DB.trim();
  constructor(private loginService: LoginService, private http: HttpClient) { }

  ngOnInit() {
    const currentAdmin = this.loginService.myUser;
    if (currentAdmin) {
      this.admin = { ...currentAdmin };
    }
  }

saveAdminChanges() {
  const currentUser = this.loginService.myUser;
  if (!currentUser) return;

  const dataToSend = {
    ...currentUser,
    userName: this.admin.userName,
    email: this.admin.email,
    role: "Admin"
  };

  this.http.put(`${this.DB_URL}/Users/${currentUser.id}`, dataToSend).subscribe({
    next: (res: any) => {
      this.loginService.updateCurrentUser(dataToSend);
      this.closeModal.emit();
    },
    error: (err) => console.error("Update failed", err)
  });
}
}