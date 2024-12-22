import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GstFileService {
  private apiUrl = 'http://localhost:3000/gst1'; 
  private apiUrl2 = 'http://localhost:3000/gst2';    
  private apiUrl3 = 'http://localhost:3000/gst3';
  private apiUrl4 = 'http://localhost:3000/gst4';
  private apiUrl5 = 'http://localhost:3000/gst5';
  private apiUrl6 = 'http://localhost:3000/gst6';
  private apiUrl7 = 'http://localhost:3000/gst7';
  private apiUrl8 = 'http://localhost:3000/gst8';
  private apiUrl9 = 'http://localhost:3000/gst9';
  private apiUrl10 = 'http://localhost:3000/gst10';
  private apiUrl11 = 'http://localhost:3000/gst11';
  private apiUrl12 = 'http://localhost:3000/gst12';
  private apiUrl13 = 'http://localhost:3000/gst13';
  private apiUrl14 = 'http://localhost:3000/gst14';
  private apiUrl15 = 'http://localhost:3000/gst15';
  private apiUrl16 = 'http://localhost:3000/gst16';
  private apiUrl17 = 'http://localhost:3000/gst17';
  private apiUrl18 = 'http://localhost:3000/gst18';
  private downloadHistoryUrl = 'http://localhost:3000/Download-history';


  constructor(private http: HttpClient) { }

  getGstDetails(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  deleteGstDetail(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  getGst2Details(): Observable<any> {
    return this.http.get<any>(this.apiUrl2);
  }

  getGst3Details(): Observable<any> {
    return this.http.get<any>(this.apiUrl3);
  }

  getGst4Details(): Observable<any> {
    return this.http.get<any>(this.apiUrl4)
  }

  getGst5Details(): Observable<any> {
    return this.http.get<any>(this.apiUrl5)
  }

  getGst6Details(): Observable<any> {
    return this.http.get<any>(this.apiUrl6)
  }

  getGst7Details(): Observable<any> {
    return this.http.get<any>(this.apiUrl7)
  }

  getGst8Details(): Observable<any> {
    return this.http.get<any>(this.apiUrl8)
  }

  getGst9Details(): Observable<any> {
    return this.http.get<any>(this.apiUrl9)
  }

  getGst10Details(): Observable<any> {
    return this.http.get<any>(this.apiUrl10)
  }

  getGst11Details(): Observable<any> {
    return this.http.get<any>(this.apiUrl11)
  }

  getGst12Details(): Observable<any> {
    return this.http.get<any>(this.apiUrl12)
  }

  getGst13Details(): Observable<any> {
    return this.http.get<any>(this.apiUrl13)
  }

  getGst14Details(): Observable<any> {
    return this.http.get<any>(this.apiUrl14)
  }

  getGst15Details(): Observable<any> {
    return this.http.get<any>(this.apiUrl15)
  }

  getGst16Details(): Observable<any> {
    return this.http.get<any>(this.apiUrl16)
  }

  getGst17Details(): Observable<any> {
    return this.http.get<any>(this.apiUrl17)
  }

  getGst18Details(): Observable<any> {
    return this.http.get<any>(this.apiUrl18)
  }

  getDownloadHistory(): Observable<any> {
    return this.http.get<any>(this.downloadHistoryUrl);
  }
  
  postDownloadHistory(downloadRecord: { user: string; time: string; downloadedTimes: number }): Observable<any> {
    return this.http.post<any>(this.downloadHistoryUrl, downloadRecord);
  }

  reDownloadFile(fileId: string): Observable<any> {
    return this.http.get<any>(`${this.downloadHistoryUrl}/${fileId}`);
  }
  
}
