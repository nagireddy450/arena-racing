import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsServicesService {
  someProperty = 'Some Value';
  private readonly token = '264c77f740cc1f02cac8f0a7e30ccdcd2f20dcf5';
  // private readonly token = localStorage.getItem('token');
  private readonly apiUrl = 'https://api.arenaracingcompany.co.uk/auth';

private  accesstoken='';
  constructor(private readonly http: HttpClient) {
    setInterval(() => {
      this.getJWT();
    }, 30 * 60 * 1000);
  }

  getJWT(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Accept': 'text/plain',
    });

    return this.http.post(`${this.apiUrl}`, null, { headers, responseType: 'text' })
      .pipe(
        tap((response: any) => {
          const token = response;
          this.accesstoken=response;
          localStorage.setItem('tokenKey', token);
          return token;
        })
      );
  }

  getToken(): any {
    let token=localStorage.getItem('tokenKey');
    if(token)
   return JSON.parse(token);
  }



  getEventsList(selectedMonth: any): Observable<any> {
    let temMonth;
    if (selectedMonth == '') {
      temMonth = new Date().getMonth() + 1;
    }
    else {
      temMonth = selectedMonth;
    }
    let _jwtToken =this.accesstoken;
    const basURl = 'https://api.arenaracingcompany.co.uk/event/month/1318/' + temMonth;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${_jwtToken}`,
    });
    return this.http.get(`${basURl}`, { headers });
  }
}
