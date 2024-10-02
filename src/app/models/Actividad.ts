import { Timestamp } from "rxjs";
import { Type } from "./Type";
export class Actividad {
    constructor(
        public  activity_id:  number,
        public  type_activity_id:  number,
        public  activity_description: string,
        public  activity_duration: string,
        public  activity_date: string,
        public  activity_state: number,
        public  activity_notes: string,
        public type?:Type
    ) {}
}