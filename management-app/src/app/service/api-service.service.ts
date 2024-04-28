import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

constructor(private http:HttpClient) { }

 url = "http://localhost:3000/"

 getUsersData(){
  return this.http.get<any>("http://localhost:3000/users");
 }

 updateUsersData(payload: any){
  return this.http.post<any>("http://localhost:3000/users",payload);
 }
}
