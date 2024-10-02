import { Component, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { TipoActividad } from 'src/app/models/TipoActividad';
import { TipoService } from 'src/app/services/tipo.service';



@Component({
  selector: 'app-actividad',
  templateUrl: './tipo-actividad.component.html',
  styleUrls: ['./tipo-actividad.component.css'],
  providers: [ TipoService]
})
export class TipoActividadComponent implements OnInit {
  public numeroIngresado!: number;
  public textoIngresado!: string;
  public records: Array<any> = [];
  public estado: boolean = false;
  public isConfirmationDialogOpen: boolean = false;
  public iddelete!: number;
  public tipp: TipoActividad = new TipoActividad(1, "sdgg", 1, "sfe");

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

  //public registroID: Actividad = new Actividad(1, 3, " ester", " estaf", "new Date", 0, " ", new Type(1, "sdgg", 1, "sfe"));




  errorMensaje: string = "";

  currentPage = 1;
  lastPage = 1;



  constructor(
    private router: Router,


    private tipoService: TipoService

  ) {



  }


  ngOnInit(): void {
    this.getData();
  }

  public getData(): void {
    this.estado = true;
    //console.log("estafo");
    this.tipoService.getTypesActivities2(this.currentPage).subscribe(
      (data: any) => {
        //console.log("nuevos: ",data.data.data);

        this.records = data.data.data;
        this.currentPage = data.data.current_page;
        this.lastPage = data.data.last_page || 1;



      },
      (error) => {
        //console.error('Error al obtener la datos:', error);
      }
    );
  }


  eliminarData(): void {
    this.estado = true;
    //console.log("numero:" + this.iddelete);
    this.tipoService.deleteTypeActivity(this.iddelete).subscribe(
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
    console.log("numero: ", this.numeroIngresado);

    this.tipoService.getTypesActivitiesID(this.numeroIngresado).subscribe(
      (data:any) => {
        this.records = [];
        if (data.data === null) {
          
        }else{
          this.records[0] = data.data;
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

    this.tipoService.getTypesActivitiesText(this.textoIngresado, this.currentPage).subscribe(
      (data: any) => {
        //console.log(data.data.data);

        this.records = data.data.data;
        this.currentPage = data.data.current_page;
        this.lastPage = data.data.last_page || 1;

      },
      (error) => {
        //console.error('Error al obtener la pagina:', error);
      }
    );


  }




  public navegarAPagina() {

    this.router.navigate(['/creaTipoActividad']); // Ruta definida en el enrutamiento
  }


  public navegarAPagina2(numer: number) {
    const numero = numer;
    this.router.navigate(['/creaTipoActividad'], { queryParams: { numero } }); // Ruta definida en el enrutamiento
  }



}
