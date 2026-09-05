import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { AboutModel } from "../models/about.models";
import { tap, map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AboutService {
  
  public apiUrl = 'http://localhost:3000/api/about';
  public about = signal<AboutModel[] | null>(null);

  constructor(private http: HttpClient) { }

  /**
   * Always returns a real array, even if the backend wraps the data
   */
  public getAllAbout(): Observable<AboutModel[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((response) => {
        if (Array.isArray(response)) {
          return response;
        }
        if (response?.data && Array.isArray(response.data)) {
          return response.data;
        }
        if (response?.about && Array.isArray(response.about)) {
          return response.about;
        }

        console.warn('Unexpected about response:', response);
        return [];
      }),
      tap((data) => this.about.set(data))
    );
  }

  public addAbout(about: FormData): Observable<any> {
    return this.http.post(this.apiUrl, about);
  }

  public updateAbout(id: number, about: FormData): Observable<AboutModel> {
    return this.http.put<AboutModel>(`${this.apiUrl}/${id}`, about);
  }

  public deleteAbout(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}