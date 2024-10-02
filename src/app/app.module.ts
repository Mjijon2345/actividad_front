
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CrearTipoActividadComponent } from './components/crear-tipo-actividad/crear-tipo-actividad.component';
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { CabeceraComponent } from './components/cabecera/cabecera.component';
import { NavegacionComponent } from './components/navegacion/navegacion.component';
import { PieComponent } from './components/pie/pie.component';
import { TipoActividadComponent } from './components/tipo-actividad/tipo-actividad.component';
import { routing } from './app.routing';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { ErrorComponent } from './components/error/error.component';
import { ActividadComponent } from './components/actividad/actividad.component';
import { EmpleadoComponent } from './components/empleado/empleado.component';
import { TypeComponent } from './components/type/type.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CrearActividadComponent } from './components/crear-actividad/crear-actividad.component';
import { CrearEmpleadoComponent } from './components/crear-empleado/crear-empleado.component';
import { PersonComponent } from './components/person/person.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    CabeceraComponent,
    NavegacionComponent,
    PieComponent,
    TipoActividadComponent,
    ErrorComponent,
    ActividadComponent,
    EmpleadoComponent,
    TypeComponent,
    CrearActividadComponent,
    CrearTipoActividadComponent,
    CrearEmpleadoComponent,
    PersonComponent,
    LoginComponent,

  ],

  imports: [
    NgxPaginationModule,
    BrowserModule,
    routing,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
