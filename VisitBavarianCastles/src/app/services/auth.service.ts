import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private baseUrl: string = 'http://localhost:5000';
  private allUsers: User[] = [];
  private currentUser: User | null = null;
  private rememberMe: boolean = false;

  constructor(private httpClient: HttpClient, private router: Router) {
    if (sessionStorage.getItem('currentUser')) {
      this.currentUser = JSON.parse(sessionStorage.getItem('currentUser')!);
    }

    if (localStorage.getItem('currentUser')) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser')!);
    }

    this.initializeUsers();
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  setCurrentUser(value: User | null): void {
    this.currentUser = value;
  }

  usernameExistsCheckOnServer(username: string): Observable<boolean> {
    const url = `/checkUsername/${username}`;
    return this.httpClient.get<boolean>(this.baseUrl + '/User' + url);
  }  

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.baseUrl + '/User');
  }
  
  initializeUsers(): void {
    this.getAllUsers().subscribe(users => {
      this.allUsers = users;
    });
  }
  
  usernameExists(username: string): boolean {
    return this.allUsers.some(user => user.username === username);
  }
  
  logOut() {
    this.currentUser = null;
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigateByUrl('/');
  }

  logIn(username: string, password: string, rememberMe: boolean): boolean {
    const user = this.allUsers.find(user => user.username === username && user.password === password);
    this.rememberMe = rememberMe;
    if (user) {
      this.currentUser = user;
      if (this.rememberMe) {
        localStorage.setItem('currentUser', JSON.stringify(user));
      } else {
        sessionStorage.setItem('currentUser', JSON.stringify(user));
      }
      return true;
    }
    return false;
  }

  register(payload: any): Observable<any> {
    return this.httpClient.post(this.baseUrl + '/User', payload);
  }
}

