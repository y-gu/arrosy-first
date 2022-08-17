import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import useGetOne from '../../../hooks/useGetOne';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDroplet } from "@fortawesome/free-solid-svg-icons";
import './Plant.scss';
import { updateDoc, arrayUnion} from "firebase/firestore";


function Plant() {
  const { id } = useParams();
  const {item: plant, itemRef: plantRef} = useGetOne('gardenCollection', id)
  const [waterIn, setWaterIn] = useState();
  const [late, setLate] = useState(0);
  const today = Math.round(Date.now() / 1000);
  //const numberOfDays = Math.round((( plant.whenToWater||today+1) - today) / 86400)
  const whenToWater = plant.lastWatered + plant.frequency * 86400
  const  numberOfDays = Math.round((( whenToWater||today+1) - today) / 86400)


  useEffect(() => {
    setWaterIn(numberOfDays)
    setLate(Math.abs(numberOfDays));
  }, [plant])


  const handleWatering = async(e) => {
    console.log(e.target)
    console.log(new Date(plant.lastWatered*1000))
    console.log(new Date(plant.whenToWater*1000))
    console.log(plant.waterAllDates)
    await updateDoc(plantRef, {
      lastWatered: today,
      waterAllDates: arrayUnion(plant.lastWatered)
  });
  }

  return (
    <div className='plant page'>


      <div className="top">
        <div className='frame'>
          <img src={plant.imgUrl} className="plant" alt="" />

          <img src={plant.potUrl} className="pot" alt="" />
          <div className="bubble-pink"></div>
          <div className="bubble-green"></div>
        </div>
        <div className="title">
          <h1>{plant.name}</h1>
          <h4>{plant.type}</h4>
        </div>

        <div className="water-info">
          <button className="water-btn" onClick={handleWatering}>
            <FontAwesomeIcon icon={faDroplet} className="drop big-drop" />
            <FontAwesomeIcon icon={faDroplet} className="drop small-drop" />
          </button>
          <div className="water">
            {waterIn > 0 ?

              <>
                <div className="blue-drop">
                  <div className="numbers">{waterIn}</div>
                </div>

                <div className="text">jours</div>
              </>
              : (waterIn === 0 ?
                <>
                  <div className="text"> Aujourd'hui</div>
                  <FontAwesomeIcon icon={faDroplet} className="drop small-drop" />

                </>


                :
                <div className='late'>
                  <div className='late'> retard</div>
                  <div className='text'>
                    <div className="blue-drop numbers">
                     <div className="numbers">{late}</div>
                   
                    </div>
                    <div> jours</div>
                  </div>

                </div>

              )}
          </div>
        </div>

      </div>
      <div className="decription">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitatio ....
      </div>
      <div className="bottom">
        <div className="framed-section">
          <div className="group">
            <div className="parameter"> Fréquence d'arrosage (jours) </div>
            <div className="grey-window">{plant.frequency}</div>
          </div>

          <div className="group">
            <div className="parameter"> Saison </div>
            <div className="grey-window"></div>
          </div>
          <div className="group">
            <div className="parameter"> Dernier arrosage</div>
            <div className="grey-window"></div>
          </div>
        </div>
        <div className="modify"></div>
      </div>
    </div>
  )
}
export default Plant;