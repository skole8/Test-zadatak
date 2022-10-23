import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Faktura } from '../models/faktura.model';

@Injectable({
  providedIn: 'root'
})
export class FaktureService {

  constructor(private http: HttpClient) { }

  baseUrl="https://localhost:7134/api/faktura";

  updateFaktura(id:string,faktura:Faktura):Observable<Faktura>
  {
      return this.http.post<Faktura>(this.baseUrl+'/'+id,faktura);
  }

  getAllFakture():Observable<Faktura[]>
  {
      return this.http.get<Faktura[]>(this.baseUrl);
  }

  addFaktura(faktura:Faktura):Observable<Faktura>
  {
    faktura.id_fakture = '00000000-0000-0000-0000-000000000000';
    return this.http.post<Faktura>(this.baseUrl,faktura)
  }

  deleteFaktura(id:string):Observable<Faktura>
  {
    return this.http.delete<Faktura>(this.baseUrl+'/'+id);
  }

  getSingleFaktura(id:string):Observable<Faktura>
  {
    return this.http.get<Faktura>(this.baseUrl+"/"+id);
  }
}
