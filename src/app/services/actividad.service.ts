import { Injectable } from "@angular/core";
import { Actividad } from "../models/Actividad";
import { Type } from "../models/Type";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

export var urlRecord = "http://localhost/api/";
@Injectable()
export class ActividadService {
  constructor(
    private http: HttpClient
  ) {

  }
  test(): string {
    return "testeando ando";
  }
  public getActivities(page: number): Observable<any> {
    return this.http.get(`${urlRecord+"activity/index"}?page=${page}`);
  }
  public getActivitiesID(id:number): Observable<any> {
    //return this.http.get(urlRecord+"activity/show/"+id);
    return this.http.get(urlRecord+"activity/show/"+id);
  }


  public getActivitiesText(text: string,page: number): Observable<any> {
    return this.http.get(`${urlRecord+"activity/search/"+text}?page=${page}`);
  }



  public deleteActivity(id:number): Observable<any> {
    return this.http.delete(urlRecord + "activity/destroy/"+id);
  }
  public createActivity(actividad:Actividad): Observable<any> {
    let params =JSON.stringify(actividad);

   
    
  let headersCreate=new HttpHeaders().set('Content-Type','application/json');
    return this.http.post(urlRecord + "activity/store",params,{headers:headersCreate});
  }
  public updateActivity(id:number,actividad:Actividad): Observable<any> {
    let params =JSON.stringify(actividad);
    console.log("con: "+id);
    console.log("conversion json: "+params);
  let headersCreate=new HttpHeaders().set('Content-Type','applicacion/json');
    return this.http.put(urlRecord + "activity/update/"+id,params,{headers:headersCreate});
  }
 

}
