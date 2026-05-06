import { Injectable } from '@angular/core'
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router'
import { Observable } from 'rxjs'
import { map, take } from 'rxjs/operators'
import { LoginService } from '../services/login.service'

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.loginService.UserChanged.pipe(
      take(1),
      map(user => {
        const isAdmin = user && user.isAdmin

        if (isAdmin) {
          return true
        } else {
          alert('Only admins can access this page')

          if (user) {
            this.loginService.logout()
          }

          return this.router.createUrlTree(['/admin/login'])
        }
      })
    )
  }
}