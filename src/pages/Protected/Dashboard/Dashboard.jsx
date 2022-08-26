import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import './Dashboard.scss';
import { Link } from "react-router-dom";
import { getPlantsSortedByLastWater } from '../../../utils';
import  watercan from "../../../assets/watercan.png"
import { getOne } from '../../../utils';
import { updateDoc, arrayUnion} from "firebase/firestore";

export default function Dashboard() {
  const [sortedGroups, setSortedGroups] = useState([])
  const [loading, setLoading] = useState(false)
  
  const fetchSortedPlants = async () => {
    const plants = await getPlantsSortedByLastWater();
    setSortedGroups(plants)
  }



  useEffect(() => {
    setLoading(true)
    fetchSortedPlants()
    setLoading(false)
  }, [])

  const handleWatering = async (e)=>{

    const wateredPlant = await getOne(e.target.getAttribute('data-id'));
    console.log(wateredPlant.data);
    await updateDoc(wateredPlant.itemRef, {
      lastWatered: today,
      waterAllDates: arrayUnion(wateredPlant.data.lastWatered)
  });
  fetchSortedPlants()
  
  }

  const { today } = useContext(AuthContext);
  return (
    <div className='dashboard page'>

      {!loading && sortedGroups ? sortedGroups.map((group, i) => {

        if (group.plants.length > 0) {
          return (
          <div key={i} className="colorGroup">

              <h2 className='group-title'>{group.name}</h2>
              <div className={`${group.colorClass} plant-collection`}>
                {
                  group.plants.map((plant, j) => {
                    return (
                      <div className="card" key={`${plant.name}-${j}`}>
                        <div className="window">
                          <Link  to={`/user/garden/plant/`+ plant.id}>
                           <img src={plant.imgUrl} alt="" className='plant' />
                          <img src={plant.potUrl} alt="" className='pot' />
                          </Link>
                        
                        </div>
                        <p className='title'>{plant.name}</p>
                        <div className='hallo'></div>
                        <img src={watercan} alt="" className='watercan' data-id={plant.id} onClick={handleWatering}/>
                      </div>
                    )
                  })
                }
              {group.colorClass==="done"&& 
                <>
                  <div className="bigBubble"></div>
                  <div className="smallBubble"></div>    
                </>}
            </div>

          </div>)
        }

      }): <div className='noInfo'><p>Pas d'arrosage à prévoir aujourd'hui et demain</p></div>}
    </div>
  )
}