import { ICategory } from "./category";

export interface IEvent {
    id: string;
    title: string;
    description: string;
    categoryId?: number;
    category: ICategory;
    dateCreated: string;
    dateOfEvent: string;
    city: string;
    mainImage: string;
    galleryImages: string;
    isBookable: boolean;
    hasTickets: boolean;
    availableTickets: number;
    views: number;
    extra1: string;
    extra2: string;
    extra3: string;
    extra4: string;
    status: string;
}