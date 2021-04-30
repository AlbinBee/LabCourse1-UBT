import React from 'react'
import { ICar } from './Array'

interface IProps{
    car: ICar;
}

const CarItem: React.FC<IProps> = ({car}:any) => {
    return (
        <div>
            <h1>Color: {car.color} - Model: {car.model}</h1>
        </div>
    )
}

export default CarItem
