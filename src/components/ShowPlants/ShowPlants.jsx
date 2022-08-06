import React from 'react';
import useUserInfo from '../../hooks/useUserInfo';
import useShowPlants from '../../hooks/useShowPlants';
import { Link } from "react-router-dom";
import './ShowPlants.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSeedling } from "@fortawesome/free-solid-svg-icons";
import pot1 from '../../assets/pot1.png';
import plant1 from '../../assets/plant1.png';

export default function ShowPlants({ handleOpenModal }) {

  const plants = useShowPlants();
  const { categories } = useUserInfo();



  return (
    <>

      {categories.length > 0 ?
        //// display if categories created
        (categories.map((cat, i) => {

          const plantsByCat = plants.filter((plant => plant.category == cat))
          return (


            <div className='plant-collection' key={i}>
              <div className="iconRound" onClick={handleOpenModal} data-category={cat}>
                +
                <FontAwesomeIcon icon={faSeedling}/>
              </div>
              <h1 className='category-title'>{cat}</h1>
              {plantsByCat.map((plant) =>

                <Link to="/not-active" className='card' key={plant.id}>
                  <div className="window">
                    <img src={plant1} alt="" className='plant' />
                    <img src={pot1} alt="" className='pot' />
                  </div>
                  <p className='title'>{plant.name}</p>
                </Link>
              )}
            </div>

            //
          )

        }))
        :
        (
          //// display if No categories
          <div className="plant-collection">
             <div className="iconRound" onClick={handleOpenModal}>
                +
                <FontAwesomeIcon icon={faSeedling} />
              </div>
            {plants.map((plant) => {
              return (

                <div className='card' key={plant.id}>

                  <div className="window">
                    <img src={pot1} alt="" />
                  </div>
                  <p className='title'>{plant.name}</p>
                </div>
              )
            })}
          </div>
        )

      }
    </>
  )
}
