import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Actividad } from 'src/app/models/Actividad';
import { Type } from 'src/app/models/Type';
import { ActividadService } from 'src/app/services/actividad.service';
import { TipoService } from 'src/app/services/tipo.service';



@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.css'],
  providers: [ActividadService, TipoService]
})
export class ActividadComponent implements OnInit {
  public numeroIngresado!: number;
  public textoIngresado!: string;
  public records: Array<any> = [];
  public estado: boolean = false;
  public isConfirmationDialogOpen: boolean = false;
  public iddelete!: number;

  openConfirmationDialog(idnumero: number) {
    this.iddelete = idnumero;
    this.isConfirmationDialogOpen = true;
  }

  closeConfirmationDialog() {
    this.isConfirmationDialogOpen = false;

  }

  confirmDeletion() {
    this.eliminarData();
    this.closeConfirmationDialog();

  }

  public registroID: Actividad = new Actividad(1, 3, " ester", " estaf", "new Date", 0, " ", new Type(1, "sdgg", 1, "sfe"));



  tipp: Type = new Type(1, "sdgg", 1, "sfe");
  errorMensaje: string = "";

  currentPage = 1;
  lastPage = 1;



  constructor(
    private router: Router,

    private actividadService: ActividadService,
    private tipoService: TipoService

  ) {



  }


  ngOnInit(): void {
    this.getData();
  }

  public getData(): void {
    this.estado = true;
    //console.log("estafo");
    this.actividadService.getActivities(this.currentPage).subscribe(
      (data: any) => {
        //console.log("nuevos: ",data.data.data);

        this.records = data.data.data;
        this.currentPage = data.data.current_page;
        this.lastPage = data.data.last_page || 1;


        for (let index = 0; index < this.records.length; index++) {
          console.log("index ejem:"+this.records[index].type_activity_id);

          
          this.records[index].type = new Type(this.records[index].type_activity_id, "sdgg", 1, "sfe");



          this.tipoService.obtenerPagina(this.records[index].type_activity_id).subscribe(
            (data: any) => {

              this.tipp = data.data;
              this.records[index].type = this.tipp;

            },
            (error) => {
              //console.error('Error al obtener los datos:', error);
            }
          );



        }

      },
      (error) => {
        //console.error('Error al obtener la datos:', error);
      }
    );
  }







  eliminarData(): void {
    this.estado = true;
    //console.log("numero:" + this.iddelete);
    this.actividadService.deleteActivity(this.iddelete).subscribe(
      (data: any) => {

        if (data.message == 'Success') {
          alert("Registro eliminado!");
          this.records= [];

          this.getData();
        } else {
          alert("Error al eliminar");

        }



      },
      (error) => {
        //console.error('Error al obtener la persona:', error);
      }
    );
  }








  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getData();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.lastPage) {
      this.currentPage++;

      this.getData();
   
    }
  }





  public onSumbmitID(): void {
    this.estado = false;
    this.records = [];
    //console.log("numero: ", this.numeroIngresado);

    this.actividadService.getActivitiesID(this.numeroIngresado).subscribe(
      (data: any) => {


        this.registroID = data.data;
        if (data.data === null) {
          
        }else{
          this.records[0] = this.registroID;
          this.registroID.type = new Type(this.registroID.type_activity_id, "sdgg", 1, "sfe");
          this.tipoService.obtenerPagina(this.registroID.type_activity_id).subscribe(
            (data: any) => {
  
              this.tipp = data.data;
              this.registroID.type = this.tipp;
            },
            (error) => {
             // console.error('Error al obtener la pagina:', error);
            }
          );
        }

      },
      (error) => {
        //console.error('Error al obtener la pagina:', error);
      }
    );




  }



  public onSumbmitText(): void {
    this.estado = false;
    this.records = [];
    //console.log("texto ingresado: " + this.textoIngresado);

    this.actividadService.getActivitiesText(this.textoIngresado, this.currentPage).subscribe(
      (data: any) => {
        //console.log(data.data.data);

        this.records = data.data.data;
        this.currentPage = data.data.current_page;
        this.lastPage = data.data.last_page || 1;

        for (let index = 0; index < this.records.length; index++) {
          this.records[index].type = new Type(this.records[index].type_activity_id, "sdgg", 1, "sfe");



          this.tipoService.obtenerPagina(this.records[index].type_activity_id).subscribe(
            (data: any) => {

              this.tipp = data.data;
              this.records[index].type = this.tipp;
              //this.records[index].type=new Type(this.records[index].type_activity_id,"sdgg",1,"sfe");

            },
            (error) => {
              //console.error('Error al obtener la pagina:', error);
            }
          );



        }

      },
      (error) => {
        //console.error('Error al obtener la pagina:', error);
      }
    );


  }




  public navegarAPagina() {

    this.router.navigate(['/creaActividad']); // Ruta definida en el enrutamiento
  }


  public navegarAPagina2(numer: number) {
    const numero = numer;
    this.router.navigate(['/creaActividad'], { queryParams: { numero } }); // Ruta definida en el enrutamiento
  }



}
