import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { TestimonialModel } from "../models/testimonial.models";
import { tap, map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TestimonialsService {
  
    public apiUrl = 'http://localhost:3000/api/testimonial';
  public testimonial = signal<TestimonialModel[] | null>(null);

  constructor(private http: HttpClient) { }

  /**
   * Always returns a real array, even if the backend wraps the data
   */
  public getAllTestimonials(): Observable<TestimonialModel[]> {
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

        console.warn('Unexpected testimonial response:', response);
        return [];
      }),
      tap((images) => this.testimonial.set(images))
    );
  }

  public addTestimonial(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }

  public updateTestimonial(id: number, image: TestimonialModel): Observable<TestimonialModel> {
    return this.http.put<TestimonialModel>(`${this.apiUrl}/${id}`, image);
  }

  public deleteTestimonial(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}