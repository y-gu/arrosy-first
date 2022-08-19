
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import './Dashboard.scss'

import { getPlantsSortedByLastWater } from '../../../utils';

export default function Dashboard() {


  const [sortedGroups, setSortedGroups] = useState()
  const [loading, setLoading] =useState('first')
  useEffect(()=>{
    setLoading(true)
    const fetchSortedPlants = async()=>{
    const plants = await getPlantsSortedByLastWater();
    setSortedGroups(plants)
    setLoading(false)
  }
  fetchSortedPlants() 
  },[])
  console.log(sortedGroups)

  const { currentUser } = useContext(AuthContext);
  return (
    <div className='dashboard'> 

        {!loading && sortedGroups.map( (group, i)=>{
        if(group.plants.length > 0 ){
          return (<div key={i}>
            <div>
             <h2 className='title'>{group.name}</h2>
            <div className={`${group.colorClass} plant-collection`}>
                {
                  group.plants.map((plant, i)=>{
                    return(
                      <div className="card">
                        <div className="window">
                    <img src={plant.imgUrl} alt="" className='plant' />
                    <img src={plant.potUrl} alt="" className='pot' />
                  </div>
                  <p className='title'>{plant.name}</p>
                      </div>
                      )
                  })
                }
            </div> 
            </div>
  
          </div>)
        }
      })}  
    </div>
  )
}
