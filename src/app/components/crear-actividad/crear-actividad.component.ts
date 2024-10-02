import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Actividad } from 'src/app/models/Actividad';
import { Type } from 'src/app/models/Type';
import { ActividadService } from 'src/app/services/actividad.service';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TipoService } from 'src/app/services/tipo.service';
import { TipoActividad } from 'src/app/models/TipoActividad';

@Component({
  selector: 'app-crear-actividad',
  templateUrl: './crear-actividad.component.html',
  styleUrls: ['./crear-actividad.component.css'],
  providers: [ActividadService, ActividadService, TipoService],
  template: '<p>El número recibido es: {{ numero }}</p>'
})


export class CrearActividadComponent {
  public numero!: number;
  public valorSeleccionadox!: string;
  public bandera = true;
  public tipos: Array<TipoActividad> = [];
  public seleccionado: string = "";
  public datosAPI: any;

  tipp: Type = new Type(1, "sdgg", 1, "sfe");
  public registroID: Actividad = new Actividad(1, 3, " ester", " estaf", "new Date", 0, " ", new Type(1, "sdgg", 1, "sfe"));


  @Input() public tipoActividad: Actividad = new Actividad(1, 1, "jjj", "ggg", "", 0, "ppp", new Type);


  public formattedDate: string = "";
  public solicitud: any;
  public estado: boolean = false;
  public estadon: number = 0;



  constructor(

    private tipoService: TipoService,
    private router: Router,
    private route: ActivatedRoute,

    private actividadService: ActividadService) {
    this.solicitud = {
      activity_id: null,
      type_activity_id: null,
      activity_description: '',
      activity_duration: '',
      activity_date: null,
      activity_state: true,
      activity_notes: '',
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
    this.router.navigate(['/actividad']); // Ruta definida en el enrutamiento
  }


  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      if (params && params['numero']) {
        this.numero = +params['numero'];
        this.onSumbmitID();
      }
    });

    this.cargarTipos();

  }



  onSeleccionChange(event: Event) {
    const valorSeleccionado = (event.target as HTMLSelectElement).value;
    //console.log('Opción seleccionada:', valorSeleccionado);
    this.valorSeleccionadox = valorSeleccionado;

    // Puedes realizar acciones adicionales aquí en función de la opción seleccionada.
  }


  public cargarTipos() {
    this.tipoService.getTypesActivities().subscribe(
      (data: TipoActividad[]) => {
        this.datosAPI = data;
        //console.log('Datos de la API:', this.datosAPI);
        //console.log("lista tipos: " + this.datosAPI.data);
        this.tipos = this.datosAPI.data.data;
        this.seleccionado = this.tipos[0].type_activity_description;
        this.valorSeleccionadox = this.tipos[0].type_activity_description;

      },
      (error) => {
        //console.error('Error al guardar datos:', error);
      }
    );


  }





  getData(): void {

    if (this.bandera) {
      const now = new Date(this.solicitud.activity_date);

      const formattedDateTime = this.formatDateTime(now);
      var state = 0;

      for (let index = 0; index < this.tipos.length; index++) {

        if (this.tipos[index].type_activity_description == this.valorSeleccionadox) {
          this.solicitud.activity_id = this.tipos[index].type_activity_id;
        }

      }

      //console.log("idds: " + this.solicitud.activity_id);


      this.tipoActividad = new Actividad(1, this.solicitud.activity_id, this.solicitud.activity_description, this.solicitud.activity_duration, formattedDateTime, this.estadon, this.solicitud.activity_notes);

      this.actividadService.createActivity(this.tipoActividad).subscribe(
        (response) => {

          //console.log('mensaje::', response.message);

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
      const now = new Date(this.solicitud.activity_date);

      const formattedDateTime = this.formatDateTime(now);


      //console.log("valor state antes:" + this.solicitud.activity_state);
      var state = 0;

      for (let index = 0; index < this.tipos.length; index++) {

        if (this.tipos[index].type_activity_description == this.valorSeleccionadox) {
          this.solicitud.type_activity_id = this.tipos[index].type_activity_id;
        }

      }

      //console.log("cambio id actualizar: "+ this.solicitud.activity_id);
      this.tipoActividad = new Actividad(this.solicitud.activity_id, this.solicitud.type_activity_id, this.solicitud.activity_description, this.solicitud.activity_duration, formattedDateTime, this.estadon, this.solicitud.activity_notes);

      this.actividadService.updateActivity(this.solicitud.activity_id, this.tipoActividad).subscribe(
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






  formatDateTime(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }


  public onSumbmitID(): void {
    this.estado = false;
    this.bandera = false;

    //console.log("numero: ", this.numero);

    this.actividadService.getActivitiesID(this.numero).subscribe(
      (data: any) => {
        this.registroID = data.data;
        //console.log(this.registroID);
        this.registroID.type = new Type(this.registroID.type_activity_id, "sdgg", 1, "sfe");
        this.tipoService.obtenerPagina(this.registroID.type_activity_id).subscribe(
          (data: any) => {

            this.tipp = data.data;
            this.registroID.type = this.tipp;

            //console.log(this.tipp);


            for (let index = 0; index < this.tipos.length; index++) {
              if (this.tipos[index].type_activity_id == this.registroID.type_activity_id) {
               
                this.seleccionado = this.tipos[index].type_activity_description;
                this.valorSeleccionadox = this.tipos[index].type_activity_description;
              }

            }










            this.solicitud.activity_id = this.registroID.activity_id,
            //console.log("cambio id: "+ this.solicitud.activity_id);
              this.solicitud.type_activity_id = this.registroID.type_activity_id,
              this.solicitud.activity_description = this.registroID.activity_description,
              this.solicitud.activity_duration = this.registroID.activity_duration,
              this.solicitud.activity_date = this.registroID.activity_date;

            this.estadon = this.registroID.activity_state;
            if (this.registroID.activity_state == 1) {
              this.estado = true;
            } else {
              this.estado = false;

            }


            this.solicitud.activity_notes = this.registroID.activity_notes

            //this.records[index].type=new Type(this.records[index].type_activity_id,"sdgg",1,"sfe");

          },
          (error) => {
            //console.error('Error al obtener la activida:', error);
          }
        );




      },
      (error) => {
        //console.error('Error al obtener la actividad:', error);
      }
    );




  }


}
