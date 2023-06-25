import { Injectable } from '@angular/core';
import { Castle } from '../interfaces/castle';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CastleService {
  private baseUrl: string = 'http://localhost:5000';
  
  constructor(private httpClient: HttpClient, private router: Router) {    
  }

  getCastles():Observable<Castle[]>{
    return this.httpClient.get<Castle[]>(this.baseUrl + '/Castle');
  }
}
