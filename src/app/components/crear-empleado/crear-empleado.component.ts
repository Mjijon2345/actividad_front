import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Type } from 'src/app/models/Type';

import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { Empleado } from 'src/app/models/Empleado';
import { Persona } from 'src/app/models/Persona';

@Component({
  selector: 'app-crear-empleado',
  templateUrl: './crear-empleado.component.html',
  styleUrls: ['./crear-empleado.component.css'],
  providers: [EmpleadoService],
  template: '<p>El número recibido es: {{ numero }}</p>'
})


export class CrearEmpleadoComponent {
  public numero!: string;
  public valorSeleccionadox!: string;
  public bandera = true;
  public empleados: Array<Empleado> = [];
  public seleccionado: string = "";
  public datosAPI: any;
  public perd: Persona = new Persona("0302790555", "MONSALVE", "MONSALVE", "MONSALVE", "MONSALVE", "MONSALVE", "MONSALVE", "MONSALVE", 1, "MONSALVE",);
  public registroID = new Empleado(1,"MONSALVE", "MONSALVE", 3, "MONSALVE", "MONSALVE", this.perd);


  // @Input() public medicina: Medicina = new Medicina(1,"", 3,5,5, "se");


  public formattedDate: string = "";
  public solicitud: any;
  public estado: boolean = false;
  public estadon: number = 0;



  constructor(

    // private medicinaService: MedicinaService,
    private router: Router,
    private route: ActivatedRoute,

    private empleadoService: EmpleadoService) {
    this.solicitud = {
      employee_id: null,
      employee_position: '',
      employee_email: '',
      employee_salary: null,
      employee_arrival_time: '',
      employee_departure_time: '',

      person_document: '',
      person_first_name: '',
      person_middle_name: '',
      person_last_name: '',
      person_second_surname: '',
      person_direction: '',
      person_phone: '',
      person_mobile: '',
      person_state: null,
      person_notes: '',

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
    this.router.navigate(['/empleado']); // Ruta definida en el enrutamiento
  }


  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      if (params && params['numero']) {
        this.numero = params['numero'];
        this.onSumbmitID();
      }
    });
  }










  getData(): void {

    if (this.bandera) {

      this.perd= new Persona(
        this.solicitud.person_document,
        this.solicitud.person_first_name,
        this.solicitud.person_middle_name,
        this.solicitud.person_last_name,
        this.solicitud.person_second_surname,
        this.solicitud.person_direction,
        this.solicitud.person_phone,
        this.solicitud.person_mobile,
        this.estadon,
        this.solicitud.person_notes);

      this.registroID = new Empleado( 
         this.solicitud.employee_id,
        this.solicitud.employee_position,
        this.solicitud.employee_email,
        this.solicitud.employee_salary,
        this.solicitud.employee_arrival_time,
        this.solicitud.employee_departure_time,this.perd);
    


      console.log("idds: " + this.solicitud.activity_id);
     
      this.empleadoService.createEmpleado( this.registroID).subscribe(
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

      this.perd= new Persona(
        this.solicitud.person_document,
        this.solicitud.person_first_name,
        this.solicitud.person_middle_name,
        this.solicitud.person_last_name,
        this.solicitud.person_second_surname,
        this.solicitud.person_direction,
        this.solicitud.person_phone,
        this.solicitud.person_mobile,
        this.estadon,
        this.solicitud.person_notes);

      this.registroID = new Empleado( 
        this.solicitud.employee_id,
        this.solicitud.employee_position,
        this.solicitud.employee_email,
        this.solicitud.employee_salary,
        this.solicitud.employee_arrival_time,
        this.solicitud.employee_departure_time,this.perd);
      this.empleadoService.updateEmpleado( this.solicitud.employee_id, this.registroID).subscribe(
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

    console.log("numero: ", this.numero);

   /* this.empleadoService.getEmpleadosID(this.numero).subscribe(
      (data: any) => {
        this.registroID = data.data;*/

        this.solicitud.person_document= this.registroID.persona.person_document,

        this.solicitud.person_first_name= this.registroID.persona.person_first_name,
        this.solicitud.person_middle_name= this.registroID.persona.person_middle_name,
        this.solicitud.person_last_name= this.registroID.persona.person_last_name,
        this.solicitud.person_second_surname= this.registroID.persona.person_second_surname,
        this.solicitud.person_direction= this.registroID.persona.person_direction,
        this.solicitud.person_phone= this.registroID.persona.person_phone,
        this.solicitud.person_mobile= this.registroID.persona.person_mobile,
        this.estadon= this.registroID.persona.person_state,
        this.solicitud.person_notes= this.registroID.persona.person_notes,


        this.solicitud.employee_id= this.registroID.employee_id,
      this.solicitud.employee_position= this.registroID.employee_position,
        this.solicitud.employee_email= this.registroID.employee_email,
        this.solicitud.employee_salary= this.registroID.employee_salary,
        this.solicitud.employee_arrival_time= this.registroID.employee_arrival_time,
        this.solicitud.employee_departure_time= this.registroID.employee_departure_time,
    



          this.estadon = this.registroID.persona.person_state;
        if (this.registroID.persona.person_state == 1) {
          this.estado = true;
        } else {
          this.estado = false;

        }

      /*

      },
      (error) => {
        //console.error('Error al obtener la activida:', error);
      }
    );

*/

  }


}
