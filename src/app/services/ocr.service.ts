import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class OcrService {
  private http = inject(HttpClient);
  private apiUrl = 'https://api.api-ninjas.com/v1/imagetotext';
  private apiKey = environment.apiKey;

  extractText(file: File): Observable<any[]> {
    const formData = new FormData();
    formData.append('image', file);

    const headers = new HttpHeaders({ 'X-Api-Key': this.apiKey });
    return this.http.post<any[]>(this.apiUrl, formData, { headers });
  }
}