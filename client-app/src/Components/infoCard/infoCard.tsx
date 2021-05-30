import React, { Component } from 'react'

const InfoCard = (props:any) => {
    return(
    <div >
        <div className="postsInfoCard"><h3 className="infoCardTitle">{props.title}</h3><span><h2 className="infoCardStat">{props.value}</h2></span></div>
    </div>
    )
}
export default InfoCard