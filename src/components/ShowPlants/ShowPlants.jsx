import React from 'react';
import useUserInfo from '../../hooks/useUserInfo';
import { Link } from "react-router-dom";
import './ShowPlants.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSeedling } from "@fortawesome/free-solid-svg-icons";
import pot1 from '../../assets/pot1.png';
import plant1 from '../../assets/plant1.png';
import useShowAll from '../../hooks/useShowAll';

export default function ShowPlants({ handleOpenModal }) {

  const plants = useShowAll('gardenCollection')
  const { categories } = useUserInfo();



  return (
    <>

      {categories.length > 0 ?
        //// display if categories created
        (categories.map((cat, i) => {

          const plantsByCat = plants.filter((plant => plant.category == cat))
          return (


            <div className='plant-collection' key={i}>
              <div className="iconRoundMustard" onClick={handleOpenModal} data-category={cat}>
                +
                <FontAwesomeIcon icon={faSeedling}/>
              </div>
              <h1 className='category-title'>{cat}</h1>
              {plantsByCat.map((plant) =>

                <Link to={`/user/garden/plant/`+ plant.id} className="card "  key={plant.id}>
                  <div className="window">
                    <img src={plant.imgUrl} alt="" className='plant' />
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
             <div className="iconRoundMustard" onClick={handleOpenModal} data-category='general'>
                +
                <FontAwesomeIcon icon={faSeedling} />
              </div>
            {plants.map((plant) => {
              return (

                <Link to={`/user/garden/plant/`+ plant.id} className="card "  key={plant.id}>

                  <div className="window">
                    <img src={plant.imgUrl} alt="" className='plant' />
                    <img src={plant.potUrl} alt="" className='pot' />
                  </div>
                  <p className='title'>{plant.name}</p>
                </Link>
              )
            })}
          </div>
        )

      }
    </>
  )
}
