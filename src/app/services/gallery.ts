import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { GalleryModel } from "../models/gallery.models";
import { tap, map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  public apiUrl = 'http://localhost:3000/api/gallery';
  public gallery = signal<GalleryModel[] | null>(null);

  constructor(private http: HttpClient) {}

  /**
   * Always returns a real array, even if the backend wraps the data
   */
  public getAllImages(): Observable<GalleryModel[]> {
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

        console.warn('Unexpected gallery response:', response);
        return [];
      }),
      tap((images) => this.gallery.set(images))
    );
  }

  public addImage(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }

  public updateImage(id: number, image: GalleryModel): Observable<GalleryModel> {
    return this.http.put<GalleryModel>(`${this.apiUrl}/${id}`, image);
  }

  public deleteImage(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getImageByCategory(category: string): Observable<GalleryModel[]> {
    return this.getAllImages().pipe(
      map((images) => images.filter(img => img.category === category))
    );
  }

  getAllCategories(): Observable<string[]> {
    return this.getAllImages().pipe(
      map((images) => [...new Set(images.map(img => img.category))])
    );
  }
}