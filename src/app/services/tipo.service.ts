import { Injectable } from "@angular/core";

import { Type } from "../models/Type";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { urlRecord } from "./actividad.service";
import { TipoActividad } from "../models/TipoActividad";




@Injectable()
export class TipoService {
    constructor(
        private http: HttpClient
    ) { }




    public obtenerPagina(id: number): Observable<Type> {
        const url = urlRecord + "type_activity/show/" + id;
        return this.http.get<Type>(url);
    }

    public getTypesActivities(): Observable<TipoActividad[]> {
        return this.http.get<TipoActividad[]>(urlRecord+"type_activity/index");
      }










      public getTypesActivities2(page: number): Observable<any> {
        return this.http.get(`${urlRecord+"type_activity/index"}?page=${page}`);
      }


      public getTypesActivitiesID(id:number): Observable<any> {
       console.log
        return this.http.get(urlRecord+"type_activity/show/"+id);
      }
    
    
      public getTypesActivitiesText(text: string,page: number): Observable<any> {
        return this.http.get(`${urlRecord+"type_activity/search/"+text}?page=${page}`);
      }
    
    
    
      public deleteTypeActivity(id:number): Observable<any> {
        return this.http.delete(urlRecord + "type_activity/destroy/"+id);
      }


      public createTypeActivity(tipo_actividad:TipoActividad): Observable<any> {
        let params =JSON.stringify(tipo_actividad);
    
       
        
      let headersCreate=new HttpHeaders().set('Content-Type','application/json');
        return this.http.post(urlRecord + "type_activity/store",params,{headers:headersCreate});
      }



      public updateTypeActivity(id:number,tipo_actividad:TipoActividad): Observable<any> {
        let params =JSON.stringify(tipo_actividad);
        console.log("con: "+id);
        console.log("conversion json: "+params);
      let headersCreate=new HttpHeaders().set('Content-Type','applicacion/json');
        return this.http.put(urlRecord + "type_activity/update/"+id,params,{headers:headersCreate});
      }

}