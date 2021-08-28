import { ICategory } from "./category";
import { IPhoto } from "./profile";

export interface IEvent {
    id: string,
    title: string,
    description: string,
    categoryId?: number,
    category?: ICategory,
    dateCreated: string,
    dateOfEvent: string,
    city: string,
    mainImage: string,
    galleryImages?: IPhoto[],
    isBookable: boolean,
    hasTickets: boolean,
    availableTickets: number,
    views: number,
    extra1: string,
    extra2: string,
    extra3: string,
    extra4: string,
    status: string,
}