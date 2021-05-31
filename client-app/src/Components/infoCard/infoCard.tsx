import React, { Component } from "react";
import './style.css'

const InfoCard = (props: any) => {
  return (
    <div className="postsInfoCard">
      <h3 className="infoCardTitle">{props.title}</h3>
      <span>
        <h2 className="infoCardStat">{props.value}</h2>
      </span>
    </div>
  );
};
export default InfoCard;
