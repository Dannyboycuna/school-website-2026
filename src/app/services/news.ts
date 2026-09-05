import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { NewsModel } from "../models/news.models";
import { tap, map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  public apiUrl = 'http://localhost:3000/api/news';
  public newsItem = signal<NewsModel[] | null>(null);

  constructor(private http: HttpClient) {}

  /**
   * Always returns a real array, even if the backend wraps the data
   */
  public getNews(): Observable<NewsModel[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((response) => {
        // Handle the most common backend formats
        if (Array.isArray(response)) {
          return response;
        }
        if (response?.data && Array.isArray(response.data)) {
          return response.data;
        }
        if (response?.images && Array.isArray(response.images)) {
          return response.images;
        }

        console.warn('Unexpected news response:', response);
        return [];
      }),
      tap((images) => this.newsItem.set(images))
    );
  }

  public addNews(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }

  public updateNews(id: number, news: NewsModel): Observable<NewsModel> {
    return this.http.put<NewsModel>(`${this.apiUrl}/${id}`, news);
  }

  public deleteNews(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  }