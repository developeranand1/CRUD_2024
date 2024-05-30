import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  api="http://localhost:3000/posts"
  constructor(private http:HttpClient) { }

  getAllData(){
    return this.http.get(this.api);
  }

  create(data:any){
    return this.http.post(this.api, data)
  }

  onDelete(id:string){
    return this.http.delete(`${this.api}/${id}`)
  }

  update(data:any, id:string){
    return this.http.put(`${this.api}/${id}`, data)
  }

  getById(id:string){
    return this.http.get(`${this.api}/${id}`);
  }
}
