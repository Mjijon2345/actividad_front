import { Component, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { Empleado } from 'src/app/models/Empleado';
import { Persona } from 'src/app/models/Persona';
import { EmpleadoService } from 'src/app/services/empleado.service';



@Component({
  selector: 'empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css'],
  providers: [EmpleadoService]
})
export class EmpleadoComponent implements OnInit {
  public numeroIngresado!: string;
  public textoIngresado!: string;
  public records: Array<Empleado> = [];
  public estado: boolean = false;
  public isConfirmationDialogOpen: boolean = false;
  public iddelete!: string;
  public perd: Persona = new Persona("0343046346346", "MONSALVE", "MONSALVE", "MONSALVE", "MONSALVE", "MONSALVE", "MONSALVE", "MONSALVE", 1, "MONSALVE",);
  public emp = new Empleado(1,"MONSALVE", "MONSALVE", 3, "MONSALVE", "MONSALVE", this.perd);


  openConfirmationDialog(idnumero: string) {
    this.iddelete = idnumero;
    this.isConfirmationDialogOpen = true;
    console.log("diss:" + this.iddelete);
  }

  closeConfirmationDialog() {
    this.isConfirmationDialogOpen = false;

  }

  confirmDeletion() {
    this.eliminarData();
    this.closeConfirmationDialog();

  }



  errorMensaje: string = "";

  currentPage = 1;
  lastPage = 1;



  constructor(
    private router: Router,


    private empleadoService: EmpleadoService

  ) {



  }


  ngOnInit(): void {
    this.getData();
  }

  public getData(): void {
    this.estado = true;
    this.records[0] = this.emp;
/*
    this.empleadoService.getEmpleados2(this.currentPage).subscribe(
      (data: any) => {
        //console.log("nuevos: ",data.data.data);
       

        console.log("mira:" + this.records[0]);
        this.records = data.data.data;
        this.currentPage = data.data.current_page;
        this.lastPage = data.data.last_page || 1;
      },
      (error) => {
        //console.error('Error al obtener la datos:', error);
      }
    );*/
  }


  eliminarData(): void {
    this.estado = true;
    console.log("numero:" + this.iddelete);
    this.empleadoService.deleteEmpleado(this.iddelete).subscribe(
      (data: any) => {

        if (data.message == 'Success') {
          alert("Registro eliminado!");
          this.records = [];

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

    this.empleadoService.getEmpleadosID(this.numeroIngresado).subscribe(
      (data: any) => {
        this.records = [];
        if (data.data === null) {

        } else {
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

    this.empleadoService.getEmpleadosText(this.textoIngresado, this.currentPage).subscribe(
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

    this.router.navigate(['/creaEmpleado']); // Ruta definida en el enrutamiento
  }


  public navegarAPagina2(numer: string) {
    const numero = numer;
    this.router.navigate(['/creaEmpleado'], { queryParams: { numero } }); // Ruta definida en el enrutamiento
  }



}
