import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from "@angular/common/http";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  signup(data: any):Observable<any>{
    return this.http.post('http://localhost:8000/auth/signup',data);
  }
  signin(data:any): Observable<any> {
    return this.http.post('http://localhost:8000/auth/login', data ); 
  }
  getProfile(): Observable<any> {
    let headers = {
      'Authorization':  "Bearer " +  localStorage.getItem('token')
    }
    return this.http.get('http://localhost:8000/auth/profile',  {headers: headers }); 
  }
}
