import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonHttpService {

  private BASE_URL = 'http://localhost:4000/api/';

  constructor(private http:HttpClient) { }
  create(resource: any): void {
    // Implementation for creating a resource
  }

  readAll(url:string): Observable<any[]> {
    const completeUrl= this.BASE_URL + url;
    return this.http.get<any[]>(completeUrl);
  }



  read(id: number): any {
    // Implementation for reading a resource by id
  }

  update(id: number, resource: any): void {
    // Implementation for updating a resource by id
  }

  delete(id: number): void {
    // Implementation for deleting a resource by id
  }
}
