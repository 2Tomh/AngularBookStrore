import { Injectable } from "@angular/core"
import { User } from "./../models/user.models"
import { HttpClient, HttpErrorResponse } from "@angular/common/http"
import { Router } from "@angular/router"
import { environment } from "../../environments/environment"
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    public userSubject = new BehaviorSubject<User | null>(null)
    UserChanged: Observable<User | null> = this.userSubject.asObservable()

    private _token: string = ""
    private readonly AUTH_URL = `${environment.DB}/Users`

    constructor(private http: HttpClient, private router: Router) { }

    get myUser(): User | null { return this.userSubject.value }

    private setMyUser(user: User) {
        this._token = user.id.toString()
        this.userSubject.next(user)
    }

    get token() {
        return this._token || localStorage.getItem('token') || ""
    }

    signUp(userName: string, email: string, password: string) {
        const userData = { userName, email, password };

        this.http.post<User>(`${this.AUTH_URL}/signup`, userData).subscribe({
            next: (user) => {
                alert("Registration successful! Logging you in...");
                this.signIn(userName, email, password);
            },
            error: (err) => {
                console.error("Signup failed", err);
                alert(err.error || "Signup failed");
            }
        });
    }
    signIn(userName: string, email: string, password: string) {
        const loginData = { userName, email, password };
        this.http.post<any>(`${this.AUTH_URL}/signin`, loginData).subscribe({
            next: (res) => {
                const loggedInUser: User = {
                    id: res.userId,
                    userName: res.userName,
                    email: email,
                    isAdmin: res.role === 'Admin',
                    password: password
                };
                if (loggedInUser.id) {
                    this.userSubject.next(loggedInUser);
                    localStorage.setItem('token', res.token);
                    this.router.navigate(['/home']);
                } else {
                    alert("Error: Server did not return a valid User ID");
                }
            },
            error: (err) => console.error("Login Error:", err)
        });
    }
    updateCurrentUser(updatedUser: User) {
        this.userSubject.next(updatedUser);
    }
    logout() {
        this._token = ""
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        this.userSubject.next(null)
        this.router.navigate(['/home'])
    }
    deleteAccount(id: number) {
        return this.http.delete(`${this.AUTH_URL}/${id}`).subscribe({
            next: () => this.logout(),
            error: (err) => console.error("delete user failed", err)
        })
    }
}