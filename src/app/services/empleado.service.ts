import { Injectable } from "@angular/core";

import { Type } from "../models/Type";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { urlRecord } from "./actividad.service";
import { Empleado } from "../models/Empleado";




@Injectable()
export class EmpleadoService {
    constructor(
        private http: HttpClient
    ) { }



    public obtenerPagina(id: number): Observable<Type> {
        const url = urlRecord + "employee/show/" + id;
        return this.http.get<Type>(url);
    }

    public getEmpleados(): Observable<Empleado[]> {
        return this.http.get<Empleado[]>(urlRecord+"employee/index");
      }


      public getEmpleados2(page: number): Observable<any> {
        return this.http.get(`${urlRecord+"employee/index"}?page=${page}`);
      }


      public getEmpleadosID(id:string): Observable<any> {
       console.log
        return this.http.get(urlRecord+"employee/show/"+id);
      }
    
    
      public getEmpleadosText(text: string,page: number): Observable<any> {
        return this.http.get(`${urlRecord+"employee/search/"+text}?page=${page}`);
      }
    
    
    
      public deleteEmpleado(id:string): Observable<any> {
        return this.http.delete(urlRecord + "employee/destroy/"+id);
      }


      public createEmpleado(employee:Empleado): Observable<any> {
        let params =JSON.stringify(employee);
        
        
      
        console.log("conversion json: "+params);
        
      let headersCreate=new HttpHeaders().set('Content-Type','application/json');
        return this.http.post(urlRecord + "employee/store",params,{headers:headersCreate});
      }



      public updateEmpleado(id:number,employee:Empleado): Observable<any> {
        let params =JSON.stringify(employee);
        console.log("con: "+id);
        console.log("conversion json: "+params);
        let headersCreate=new HttpHeaders().set('Content-Type','applicacion/json');
        return this.http.put(urlRecord + "employee/update/"+id,params,{headers:headersCreate});
      }

}