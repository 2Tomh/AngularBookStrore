import { Component, OnInit } from '@angular/core'
import { LoginService } from '../../services/login.service'
import { Subscription } from 'rxjs'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false
  isAdmin: boolean = false
  private userSub!: Subscription
  isAccountModalOpen = false
  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.userSub = this.loginService.UserChanged.subscribe(user => {
      this.isAuthenticated = !!user
      if (user) {
        this.isAdmin = (user as any).role === 'Admin' || user.isAdmin === true
      } else {
        this.isAdmin = false
      }
    })
  }

  onLogout() {
    this.loginService.logout()
  }

  ngOnDestroy() {
    this.userSub.unsubscribe()
  }

}
