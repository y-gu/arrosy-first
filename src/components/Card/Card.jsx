import React from 'react';
import { Link } from 'react-router-dom';
import "./Card.scss";
import  watercan from "../../assets/watercan.png";

export default function Card({ plant, groupType, handleClick }) {
    console.log(groupType)
    return (
        <div to={`/user/garden/plant/` + plant.id}  key={plant.id}>
            <div className="card">
                <div className="window">
                <Link  to={`/user/garden/plant/`+ plant.id}>
                    <img src={plant.imgUrl} alt="" className='plant' />
                    <img src={plant.potUrl} alt="" className='pot' />
                </Link>
                </div>
                <Link  to={`/user/garden/plant/`+ plant.id} className='title'>{plant.name}</Link>
                <div className='card-bottom'>
                    {groupType === "gardenGroup" && <img src={watercan} />}
                </div>
            </div>
        </div>
    )
}
