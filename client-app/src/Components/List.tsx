import React from 'react';
import { cars } from './Array';

const List = () => {
    return(
        <div>
            <ul>
                {cars.map((car)=> (
                    <li>Color: {car.color} -- Model: {car.model} -- Top Speed: {car.topSpeed}</li>
                    // <li>{car.model}</li>
                ))}
            </ul>
        </div>
    );
}
export default List;