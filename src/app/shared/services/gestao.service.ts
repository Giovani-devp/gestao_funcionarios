import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IworkSheet } from 'src/app/features/gestao/models/work-sheet.model';

@Injectable({
  providedIn: 'root'
})
export class GestaoService {

  public mock = 'https://run.mocky.io/v3/b0f61012-1fd7-4381-95f7-6945a8749ff5';

  constructor(private http: HttpClient) { }

  getAllData(): Observable<any> {
    return this.http.get<IworkSheet>(`${this.mock}`);
  }

}
