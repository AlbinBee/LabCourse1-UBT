export interface ICar{
    color: string;
    model: string;
    topSpeed?: number;
}

const car1: ICar = {
    color: "Black",
    model: "Audi",
    topSpeed: 280
}

const car2: ICar = {
    color: "Blue",
    model: "Benz",
}

export const cars = [car1, car2];