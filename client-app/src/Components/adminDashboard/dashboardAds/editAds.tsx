import React, { Component } from 'react'
import { IAd } from '../../../app/models/ad'

interface IProps {
    ad: IAd;
}

const EditAds: React.FC<IProps> = ({ ad }) => {
    return(
        <div>
            <h1>Hello {ad.id}</h1>
            <h1>{ad.title}</h1>
            <h1>{ad.type}</h1>
        </div>
    )
}
export default EditAds
