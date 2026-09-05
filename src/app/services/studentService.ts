import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { StudentModel } from "../models/student.models";
import { tap, map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  
  public apiUrl = 'http://localhost:3000/api/student';
  public students = signal<StudentModel[] | null>(null);

  constructor(private http: HttpClient) { }

  /**
   * Always returns a real array, even if the backend wraps the data
   */
  public getAllStudents(): Observable<StudentModel[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((response) => {
        if (Array.isArray(response)) {
          return response;
        }
        if (response?.data && Array.isArray(response.data)) {
          return response.data;
        }
        if (response?.students && Array.isArray(response.students)) {
          return response.students;
        }

        console.warn('Unexpected student response:', response);
        return [];
      }),
      tap((data) => this.students.set(data))
    );
  }

  public addStudent(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }

  public updateStudent(id: number, student: StudentModel): Observable<StudentModel> {
    return this.http.put<StudentModel>(`${this.apiUrl}/${id}`, student);
  }

  public deleteStudent(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}