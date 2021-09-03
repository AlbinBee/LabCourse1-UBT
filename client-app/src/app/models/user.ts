import { IPhoto } from "./profile";

export interface IListUser {
    displayName: string;
    bio: string;
    photos: IPhoto[];
    username: string;
    email: string;
    status: string;
    roles: string[];
}
export interface IUser {
    username: string;
    displayName: string;
    token: string;
    image?: string;
    status: string;
    email: string;
    roles: string[];
}
export interface IUserFormValues {
    email: string;
    password: string;
    username?: string;
    displayName?: string;
}

