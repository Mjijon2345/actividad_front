import { Component, Input, Output } from "@angular/core"
import { Type } from "src/app/models/Type"
import { EventEmitter } from "@angular/core";

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.css']
})
export class TypeComponent {
  @Input() public type:Type=new Type(0, "jjj", 1, "ppp");


} 
