import { Persona } from "./Persona";

export class Empleado {
    constructor(
        public employee_id:number,
        public employee_position: string,
        public employee_email: string,
        public employee_salary: number,
        public employee_arrival_time: string,
        public employee_departure_time: string,
        public persona: Persona
    ) { }
}