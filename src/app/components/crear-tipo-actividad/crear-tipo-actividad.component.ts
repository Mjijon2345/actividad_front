import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Type } from 'src/app/models/Type';

import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TipoService } from 'src/app/services/tipo.service';
import { TipoActividad } from 'src/app/models/TipoActividad';

@Component({
  selector: 'app-crear-actividad',
  templateUrl: './crear-tipo-actividad.component.html',
  styleUrls: ['./crear-tipo-actividad.component.css'],
  providers: [TipoService],
  template: '<p>El número recibido es: {{ numero }}</p>'
})


export class CrearTipoActividadComponent {
  public numero!: number;
  public valorSeleccionadox!: string;
  public bandera = true;
  public tipos: Array<TipoActividad> = [];
  public seleccionado: string = "";
  public datosAPI: any;

  tipp: Type = new Type(1, "sdgg", 1, "sfe");
  public registroID: TipoActividad = new TipoActividad(1,"", 3, "se");


  @Input() public tipoActividad: TipoActividad = new TipoActividad(1,"", 3, "se");


  public formattedDate: string = "";
  public solicitud: any;
  public estado: boolean = false;
  public estadon: number = 0;



  constructor(

    private tipoService: TipoService,
    private router: Router,
    private route: ActivatedRoute,

    private tipoactividadService: TipoService) {
    this.solicitud = {
      tipo_activity_id: null,
      tipo_activity_description: '',
      tipo_activity_state: true,
      tipo_activity_notes: '',
    }

  }


  seleccionarOpcion() {
    if (this.estadon == 1) {
      this.estadon = 0;
      this.estado = false;
    } else {
      this.estadon = 1;
      this.estado = true;
    }
    //console.log("valor estadon: " + this.estadon);

  }

  public lleno(): string {
    return this.solicitud.nombre;
  }

  public onSumbmit(): void {


    this.getData();


  }

  navegarAPagina() {
    this.router.navigate(['/tipoactividad']); // Ruta definida en el enrutamiento
  }


  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      if (params && params['numero']) {
        this.numero = +params['numero'];
        this.onSumbmitID();
      }
    });



  }










  getData(): void {

    if (this.bandera) {
      

      

      console.log("idds: " + this.solicitud.activity_id);


      this.tipoActividad = new TipoActividad(1,  this.solicitud.tipo_activity_description,  this.estadon, this.solicitud.tipo_activity_notes);

      this.tipoService.createTypeActivity(this.tipoActividad).subscribe(
        (response) => {

          console.log('mensaje::', response.message);

          if (response.message == 'Success') {
            alert("Registro guardado con exito !");
            this.navegarAPagina();
          } else {
            alert("Error al guardar");

          }

        },
        (error) => {
          console.error('Error al guardar datos:', error);
        }
      );

    } else {
      

      //console.log("cambio id actualizar: "+ this.solicitud.activity_id);
      this.tipoActividad = new TipoActividad(this.solicitud.tipo_activity_id,  this.solicitud.tipo_activity_description,  this.estadon, this.solicitud.tipo_activity_notes);

      this.tipoService.updateTypeActivity(this.solicitud.tipo_activity_id, this.tipoActividad).subscribe(
        (response) => {

          //console.log('mensaje::', response.message);

          if (response.message == 'Success') {
            alert("Registro actualizado con exito !");
            this.navegarAPagina();
          } else {
            alert("Error al actulizar");

          }

        },
        (error) => {
          //console.error('Error al guardar datos:', error);
        }
      );

    }

  }


  

  public onSumbmitID(): void {
    this.estado = false;
    this.bandera = false;

    //console.log("numero: ", this.numero);

    this.tipoService.getTypesActivitiesID(this.numero).subscribe(
      (data: any) => {
        this.registroID = data.data;
            this.solicitud.tipo_activity_id = this.registroID.type_activity_id,
            //console.log("cambio id: "+ this.solicitud.activity_id);
              this.solicitud.tipo_activity_description = this.registroID.type_activity_description,

            this.estadon = this.registroID.type_activity_state;
            if (this.registroID.type_activity_state == 1) {
              this.estado = true;
            } else {
              this.estado = false;

            }


            this.solicitud.tipo_activity_notes = this.registroID.type_activity_note

            //this.records[index].type=new Type(this.records[index].type_activity_id,"sdgg",1,"sfe");

          },
          (error) => {
            //console.error('Error al obtener la activida:', error);
          }
        );



  }


}
