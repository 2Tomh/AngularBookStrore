import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;
  isAdmin: boolean = false;
  private userSub!: Subscription;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.userSub = this.loginService.userChanged.subscribe(user => {
      this.isAuthenticated = !!user;
      this.isAdmin = user ? user.isAdmin : false;
    });
  }

  onLogout() {
    this.loginService.logOut();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
