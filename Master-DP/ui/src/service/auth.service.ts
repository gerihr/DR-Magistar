import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../model/user";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const API_URL = 'http://localhost:8099/v1/';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public readonly isLoggedIng$ = this.loggedIn.asObservable();


    private organiser: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public readonly isOrganiser$ = this.organiser.asObservable();

    constructor(private http: HttpClient, private router: Router) {
        this.userSubject = new BehaviorSubject<User>(
            JSON.parse(<string>localStorage.getItem('currentUser'))
        );
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    login(email: string, password: string): Observable<any> {
        return this.http.post('http://localhost:8099/v1/login', {
                email,
                password
            },
            httpOptions);
    };

    registration(newUserData): Observable<any> {
        return this.http.post(`http://localhost:8099/v1/register`, newUserData, httpOptions);
    }

    
    setLogedIn(bool:boolean){
        this.loggedIn.next(bool)
    }

    setIsOrganiser(bool:boolean){
        this.organiser.next(bool)
    }

    logout(): Observable<any> {
        const headers = new HttpHeaders().set('session-token', this.getToken());
        return this.http.put('http://localhost:8099/v1/logout', {}, { "headers":headers });
    }

    signOut(): void {
        window.sessionStorage.clear();
        this.setLogedIn(false);
        this.router.navigateByUrl('/login')
    }

    public saveToken(token: string): void {
        window.sessionStorage.removeItem('session-token');
        window.sessionStorage.setItem('session-token', token);
    }

    public getToken(): string | null {
        return window.sessionStorage.getItem('session-token');
        //return localStorage.getItem('session-token');
    }

    public saveUser(user: any): void {
        window.sessionStorage.removeItem('auth-user');
        window.sessionStorage.setItem('auth-user', JSON.stringify(user));
        window.sessionStorage.removeItem('session-token');
        window.sessionStorage.setItem('session-token', JSON.stringify(user));
        localStorage.setItem('session-token', user.sessionToken);
        this.setLogedIn(true);
    }

    public getUser(): any {
        const user = window.sessionStorage.getItem('auth-user');
        if (user) {
            return JSON.parse(user);
        } else {
            return {};
        }
    }

    getUserId(){
        if(window.sessionStorage.getItem('auth-user') ){
           return JSON.parse(window.sessionStorage.getItem('auth-user')).id
        }
        return null;
    }
}
