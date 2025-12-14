import { Injectable } from "@angular/core";
import { User } from "./../models/user.models";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { ApiResult } from "../models/apiResult.model";
import { environment } from "../../environments/environment";
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    public userSubject = new BehaviorSubject<User | null>(null);
    userChanged: Observable<User | null> = this.userSubject.asObservable();
    private _token!: string

    constructor(private http: HttpClient, private router: Router) { }

    get myUser(): User | null { return this.userSubject.value; }

    private setMyUser(userName: string, id: string, isAdmin: boolean, password:string, email:string) {
        const user: User = { userName,password, email, id, isAdmin };
        this.userSubject.next(user);
    }

    get token() {
        return this._token
    }
    signUp(userName: string, email: string, password: string) {
        const isAdmin = false;

        this.http.post<ApiResult>(
            environment.FIREBASE_SIGNUP,
            { email, password, returnSecureToken: true }
        ).pipe(
            tap((res: ApiResult) => {
                this._token = res.idToken;
            }),
            switchMap((res: ApiResult) => {
                const userId = res.localId;

                const userData = {
                    userName: userName,
                    email: email,
                    password: password,
                    isAdmin: isAdmin
                };

                const DB_URL = environment.DB.trim();

                return this.http.put(`${DB_URL}/users/${userId}.json?auth=${res.idToken}`, userData)
                    .pipe(
                        switchMap(() => of({ userId }))
                    );
            })
        ).subscribe({
            next: ({ userId }) => {
                this.setMyUser(userName, userId, isAdmin, password,email);
                this.router.navigate(['/home']);
            },
            error: (err: HttpErrorResponse) => {
                let errorMessage = 'Signup failed. Please check your credentials and internet connection.';

                if (err.error?.error?.message) {
                    errorMessage = err.error.error.message;
                }

                console.error(`Signup failed: ${errorMessage}`, err);
                this.userSubject.next(null);
            }
        });
    }

    signIn(userName: string, email: string, password: string) {
        let userId: string;
        let token: string;
        let isAdmin: boolean = false;

        this.http.post<ApiResult>(
            environment.FIREBASE_SIGNIN,
            { email, password, returnSecureToken: true }
        ).pipe(
            tap((res: ApiResult) => {
                token = res.idToken;
                userId = res.localId;
            }),
            switchMap(() => {
                const DB_URL = environment.DB.trim();
                return this.http.get<any>(`${DB_URL}/users/${userId}.json?auth=${token}`);
            })
        ).subscribe({
            next: (dbRes) => {
                isAdmin = dbRes?.isAdmin || false;
                this._token = token;
                const actualUserName = dbRes?.userName || userName;

                this.setMyUser(actualUserName, userId, isAdmin, password, email);
                this.router.navigate(['/home']);
            },
            error: (err: HttpErrorResponse) => {
                let errorMessage = 'Sign-in failed. Please check your credentials.';

                if (err.error && err.error.error && err.error.error.message) {
                    errorMessage = err.error.error.message;
                }

                console.error(`Sign-in failed: ${errorMessage}`, err);
                this.userSubject.next(null);
            }
        });
    }

    logOut() {
        this._token = ""
        this.userSubject.next(null);
        this.router.navigate(['/home'])
    }
}