import React, { useState, useRef, useEffect } from "react";
import { auth } from "../../firebase/config";
import { allUsers } from "../../firebase/config";
import { doc, collection, setDoc } from "firebase/firestore";
import useUserInfo from '../../hooks/useUserInfo';
import plantTypes from '../../data';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "./AddPlant.scss"

export default function AddPlant({ setModal }) {

  const [typeOfPlant, setTypeOfPlant] = useState("inconnu");
  const [categoryOfPlant, setCategoryOfPlant] = useState("none");
  const { categories } = useUserInfo();
  const nameRef = useRef();
  const formRef = useRef();
  const frequencyRef = useRef();

  const handleClick = (e) => {
    e.preventDefault()
    setModal(false)
  }

  const handleChangeType = (e) => {
    setTypeOfPlant(e.target.value)
  }

  const handleChangeCategory = (e) => {
    setCategoryOfPlant(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPlantRef = doc(collection(doc(allUsers, auth.currentUser.uid), 'gardenCollection'))
    await setDoc(newPlantRef, { name: nameRef.current.value, type: typeOfPlant, frequency: frequencyRef.current.value, category: categoryOfPlant });
    formRef.current.reset();
  };
  return (


    <div className="backgroundModal" >
      {/* <div className="roundOne"></div>
      <div className="roundTwo"></div> */}

      <form onSubmit={handleSubmit} className="form-add" ref={formRef} >
            {/* <div className="modal-title"> Ajouter une plante </div>  */}
        <FontAwesomeIcon icon={faXmark} className="iconClose" onClick={handleClick} />
        <div className="contour">
          <div className="form-group">
            <label htmlFor="name">Nom</label>
            <input id="name" type="text" className="form-control" ref={nameRef} required />
          </div>

          <div className="form-group">

            <label htmlFor="type">Type de plante</label>
            <select onChange={handleChangeType}>
              <option value="" key="A" >inconnu</option>
              {plantTypes.map((plantType, index) => {
                return (<option value={plantType} key={index} >{plantType}</option>)
              })}

            </select>
          </div>

          {categories.length >= 2 &&
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select onChange={handleChangeCategory} required>
                <option value="" key="CategoryNone" >Aucune</option>
                {categories.map((cat, index) => {
                  return (<option value={cat} key={index} >{cat}</option>)
                })}
              </select>
            </div>
          }
          <div className="form-group">
            <label htmlFor="frequency">Fréquence d'arrosage (jour)</label>
            <input name="frequency" type="number" defaultValue="4" className="form-control" ref={frequencyRef} />
          </div>
          <div className="form-group">
            <label htmlFor="lastWater">Dernier arrosage. Il y a</label>
            <input name="lastWater" type="number"  className="form-control" required/>
            <label htmlFor="lastWater">jours</label>
          </div>
        </div>
        <button className="stdBtn dark">Ajouter cette plante</button>

      </form>

    </div>
  );
}
