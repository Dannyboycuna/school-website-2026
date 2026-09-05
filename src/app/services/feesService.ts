import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { FeeModel } from "../models/fee.models";
import { tap, map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FeesService {
  
  public apiUrl = 'http://localhost:3000/api/fees';
  public fees = signal<FeeModel[] | null>(null);

  constructor(private http: HttpClient) { }

  /**
   * Always returns a real array, even if the backend wraps the data
   */
  public getAllFees(): Observable<FeeModel[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((response) => {
        if (Array.isArray(response)) {
          return response;
        }
        if (response?.data && Array.isArray(response.data)) {
          return response.data;
        }
        if (response?.fees && Array.isArray(response.fees)) {
          return response.fees;
        }

        console.warn('Unexpected fees response:', response);
        return [];
      }),
      tap((data) => this.fees.set(data))
    );
  }

  public addFee(fee: FeeModel): Observable<any> {
    return this.http.post(this.apiUrl, fee);
  }

  public updateFee(id: number, fee: FeeModel): Observable<FeeModel> {
    return this.http.put<FeeModel>(`${this.apiUrl}/${id}`, fee);
  }

  public deleteFee(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}