import { Injectable } from '@angular/core';
import { VisitRecord } from '../interfaces/visitRecord';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisitRecordsService {
  private baseUrl: string = 'http://localhost:5000';
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  private allRecords: VisitRecord[] = [];
  constructor(private httpClient: HttpClient, private router: Router) { }

  getRecordsOfUser(username:string):Observable<VisitRecord[]>{
    return this.httpClient.get<VisitRecord[]>(this.baseUrl + '/VisitRecord', {params:{ username }});
  }

  addRecordOfUser(username:string, record:VisitRecord):Observable<VisitRecord>{
    console.log(record)
    console.log(username)
    return this.httpClient.post<VisitRecord>(
      `${this.baseUrl  + '/VisitRecord'}/${username}`,
      record,
      this.httpOptions
    );
  }
  deleteRecord(id:number):Observable<VisitRecord>{
    return this.httpClient.delete<VisitRecord>(`${this.baseUrl  + '/VisitRecord'}/${id}`, this.httpOptions);
  }

  editRecord(id:number, record:VisitRecord):Observable<VisitRecord>{
    return this.httpClient.put<VisitRecord>(`${this.baseUrl+ '/VisitRecord'}/${id}`, record, this.httpOptions);
  }
}
