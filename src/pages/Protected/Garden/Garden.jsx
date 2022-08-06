import React, { useEffect, useState } from "react";
import garden from "../../../assets/garden.png";
import hyacinth from "../../../assets/hyacinth.png";
import monstera from "../../../assets/monstera.png";
import quaking from "../../../assets/quaking.png"
import "./Garden.scss";
import CreateGarden from "../../../components/CreateGarden/CreateGarden";
import AddPlant from "../../../components/AddPlant/AddPlant";
import ShowPlants from "../../../components/ShowPlants/ShowPlants";
import useUserInfo from "../../../hooks/useUserInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSeedling } from "@fortawesome/free-solid-svg-icons";


function Garden() {

  const { userInfo, loading } = useUserInfo();
  const [modal, setModal] = useState(false)
  const [clickedCat, setClickedCat] = useState()

  const handleOpenModal = (e) => {
    setModal(true);
    setClickedCat(e.currentTarget.getAttribute('data-category'))
  }


  return (


    <>

      <div className="page garden">
        {/* <div className="btn-container">
        <div className="addBtn">+ collection</div>
        <div className="addBtn">+ plante</div>
      </div> */}
        <div className="image-container" >
          <img src={garden} alt="deco" />
          <div className="title">
            {userInfo.gardenName && userInfo.gardenName}
            {!userInfo.gardenName && !loading && "Créer ton Jardin"}
          </div>
        </div>
        <div className="garden-content">
          {/* <img src={hyacinth} className="deco-left" alt="deco " />
      <img src={quaking} className="deco-right" alt="deco" />
      <img src={monstera} className="deco-middle" alt="deco" />  */}
          {/* <div className="icon-wrapper">
            <div className="iconRound" onClick={handleClick}>
              +
              <FontAwesomeIcon icon={faSeedling} />
            </div> 

          </div> */}

          {userInfo.gardenName && <ShowPlants setModal={setModal} handleOpenModal ={handleOpenModal}  />}

          {!userInfo.gardenName && !loading && <CreateGarden setModal={setModal} />}


        </div>
        {modal && <AddPlant setModal={setModal} clickedCat={clickedCat}/>}
      </div>

    </>
  );
}

export default Garden;
