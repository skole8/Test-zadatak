import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Artikal } from '../models/artikal.model';
@Injectable({
  providedIn: 'root'
})
export class ArtikliService {

  constructor(private http: HttpClient) { }

  baseUrl="https://localhost:7134/api/artikal";

  getAllArtikli():Observable<Artikal[]>
  {
      return this.http.get<Artikal[]>(this.baseUrl);
  }

  addArtikal(artikal:Artikal):Observable<Artikal>
  {
    artikal.id_artikla = '00000000-0000-0000-0000-000000000000';
    return this.http.post<Artikal>(this.baseUrl,artikal)
  }

  deleteArtikal(id:string):Observable<Artikal>
  {
    return this.http.delete<Artikal>(this.baseUrl+"/"+id);
  }

  updateArtikal(id:string,artikal:Artikal):Observable<Artikal>
  {
      return this.http.post<Artikal>(this.baseUrl+'/'+id,artikal);
  }
  
}
