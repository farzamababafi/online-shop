import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Commodity } from '../models/commodities.model';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ManagerService {
  private httpClient = inject(HttpClient);
  private authService = inject(AuthService);
  url = 'http://localhost:3000/api/commodities/';
  fetchByGroup() {
    return this.httpClient.get<{ category: string; count: number }[]>(
      this.url + 'dashboard'
    );
  }
  fetchById(id: string) {
    const headers = this.tokenHeaders();
    return this.httpClient.get<Commodity>(this.url + id);
  }

  postCommodity(formData: FormData) {
    const headers = this.tokenHeaders();
    return this.httpClient.post(this.url, formData, { headers });
  }
  deleteCommodit(id: string) {
    const headers = this.tokenHeaders();
    return this.httpClient.delete<{ message: string }>(this.url + id, {
      headers,
    });
  }

  fetch() {
    return this.httpClient.get<Commodity[]>(this.url);
  }
  tokenHeaders() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.isAuth()}`, // Add the token to the Authorization header
    });
    return headers;
  }
  getImage(fileName: string | undefined): Observable<Blob> {
    return this.httpClient.get('http://localhost:3000/uploads/' + fileName, {
      responseType: 'blob',
    });
  }
}
