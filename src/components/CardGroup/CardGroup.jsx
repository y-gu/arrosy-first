import React from 'react';
import './CardGroup.scss'
import Card from '../Card/Card';
import useShowAll from '../../hooks/useShowAll';
import useUserInfo from '../../hooks/useUserInfo';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSeedling } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';

export default function CardGroup({plants, groupType}) {

    return (
        <>
        {groupType === "dashboardGroup" && ( <h2 className='group-title'>TEST</h2>)}
        <div className={`plant-group  ${groupType}`}>
            {
                groupType === "gardenGroup" &&
                <>
                    <div className="iconRoundMustard" data-category="e" >
                        +
                        <FontAwesomeIcon icon={faSeedling} />
                    </div>
                     <h1 className='category-title'>category</h1> 
                </>
            }
        
            {plants.map((plant, i) =>

                <Card plant={plant} groupType={groupType} key={`${plant.name}-${i}`}/>

            )}

        </div>
        </>
    )
}
