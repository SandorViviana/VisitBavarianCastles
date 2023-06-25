import { Status } from "../enums/status";
import { Castle } from "./castle";

export interface VisitRecord{
id:number,
castle:Castle,
visitDate ?: Date,
addDate:Date,
status:Status
}