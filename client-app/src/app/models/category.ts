import { IEvent } from "./event";
import { IPhoto } from "./profile";

export interface ICategory {
    id?: number;
    title: string;
    description: string;
    photos?: IPhoto[];
    events?: IEvent[];
}