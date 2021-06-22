export interface IActivity{
    id: string;
    title: string;
    description: string;
    category: string;
    date: string;
    city: string;
    venue: string;
    attendees: IAttendee[];
}
export interface IAttendee{
    username: string;
    displayName: string;
    image: string;
    isHost: boolean;
}