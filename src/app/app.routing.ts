import { ModuleWithProviders } from "@angular/core";
import { Routes,RouterModule } from "@angular/router";


import { AuthGuard } from './services/auth.guard';




import { InicioComponent } from "./components/inicio/inicio.component";
import { CrearTipoActividadComponent } from "./components/crear-tipo-actividad/crear-tipo-actividad.component";
import { CrearActividadComponent } from "./components/crear-actividad/crear-actividad.component";
import { CrearEmpleadoComponent } from "./components/crear-empleado/crear-empleado.component";








import { TipoActividadComponent } from "./components/tipo-actividad/tipo-actividad.component";
import { ErrorComponent } from "./components/error/error.component";
import { ActividadComponent } from "./components/actividad/actividad.component";
import { EmpleadoComponent } from "./components/empleado/empleado.component";
import { LoginComponent } from "./components/login/login.component";


 const appRoutes:Routes= [
   { path: 'creaActividad/:numero?', component: CrearActividadComponent },
   { path: 'creaActividad', component: CrearActividadComponent },
   { path: 'creaTipoActividad/:numero?', component: CrearTipoActividadComponent },
   { path: 'creaTipoActividad', component: CrearTipoActividadComponent },
   { path: 'creaEmpleado/:numero?', component: CrearEmpleadoComponent },
   { path: 'creaEmpleado', component: CrearEmpleadoComponent },


   


    


   //NUEVAS

  
    {path: '',component:LoginComponent, pathMatch: 'full'},
    {path: 'inicio',component:InicioComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },





    {path: 'tipoactividad',component:TipoActividadComponent, canActivate: [AuthGuard]},
    {path: 'tipoactividad/:id',component:TipoActividadComponent},
    {path: 'actividad',component:ActividadComponent, canActivate: [AuthGuard]},
    {path: 'empleado',component:EmpleadoComponent, canActivate: [AuthGuard]},
    {path: '**',component:LoginComponent},
 ];


 export const routing:ModuleWithProviders<Object>= RouterModule.forRoot(appRoutes);