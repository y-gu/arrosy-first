import React, { useState, useRef, useEffect } from "react";
import { auth } from "../../firebase/config";
import { allUsers } from "../../firebase/config";
import { doc, collection, setDoc, serverTimestamp, getDoc } from "firebase/firestore";
import useUserInfo from '../../hooks/useUserInfo';
//import plantTypes from '../../data';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "./AddPlant.scss";
import useStorage from "../../hooks/useStorage";
import usePlantTypes from "../../hooks/usePlantTypes";
import useShowAll from "../../hooks/useShowAll";
import { getAll } from "../../utils";

export default function AddPlant({ setModal, clickedCat }) {

  const [typeOfPlant, setTypeOfPlant] = useState("inconnu");
  const [categoryOfPlant, setCategoryOfPlant] = useState(clickedCat);
  const { categories } = useUserInfo();
  const nameRef = useRef();
  const formRef = useRef();
  const frequencyRef = useRef();
  const lastWaterRef = useRef();
  const descriptionRef= useRef();


  const plantTypes = usePlantTypes();
  plantTypes.sort((a, b) => {
    if (a.type < b.type) return -1
    return a.type > b.type ? 1 : 0
  })



  useEffect(() => {
    window.scrollTo(0, 0);
    setCategoryOfPlant(clickedCat)
  }, [])



  const imgUrl = useStorage('plants', typeOfPlant);
  const drawnPlant = useStorage('drawn_plants', 'plant1');
  const imgPlant = imgUrl ? imgUrl : drawnPlant;

  const potUrl = useStorage('pots', 'pot1');


  const handleClick = (e) => {
    e.preventDefault()
    setModal(false)
  }

  // const typeInfo = useShowAll('plants', 'type',  typeOfPlant)
  const [description, setDescription] = useState('');
  const handleChangeType = async (e) => {
    setTypeOfPlant(e.target.value);
    const typeInfo = await getAll('plants', 'type',  e.target.value);
    setDescription(typeInfo[0].description)
  }

  const handleChangeCategory = (e) => {
    setCategoryOfPlant(e.target.value);
  
  }

  //  const description = typeOfPlant ? typeInfo[0].description :''


  const handleSubmit = async (e) => {
    e.preventDefault();

    //const today = Timestamp.fromDate(new Date());
    const today = Math.floor(new Date().getTime() / 1000);
    //const lastWatered = new Date((today - lastWaterRef.current.value * 86400)*1000);
    const lastWatered = Math.floor(today - lastWaterRef.current.value * 86400)
    //const whenToWater =new Date((Timestamp.fromDate(lastWatered).seconds + frequencyRef.current.value * 86400)*1000)
    //const whenToWater = lastWatered + frequencyRef.current.value * 86400
    //const defaultDescription =  typeInfo[0].description 

    // const description = descriptionRef.current.value.length <=1 || descriptionRef.current.value == undefined ? typeInfo[0].description  : descriptionRef.current.value
    const newPlantRef = doc(collection(doc(allUsers, auth.currentUser.uid), 'gardenCollection'))
    await setDoc(newPlantRef, { name: nameRef.current.value, type: typeOfPlant, frequency: frequencyRef.current.value, category: categoryOfPlant, imgUrl: imgPlant, potUrl: potUrl, createdAt: serverTimestamp(), lastWatered: lastWatered, waterAllDates: [], description:description });
    formRef.current.reset();
    setDescription('')
  };
  return (


    <div className="backgroundModal" >

      <form onSubmit={handleSubmit} className="form-add" ref={formRef} >

        <FontAwesomeIcon icon={faXmark} className="iconClose" onClick={handleClick} />
        <div className="contour">
          <div className="basic-info">
            <div className="form-group">
              <label htmlFor="name">Nom</label>
              <input id="name" type="text" className="form-control" ref={nameRef} required />
            </div>

            <div className="form-group">

              <label htmlFor="type">Type de plante</label>
              <select onChange={handleChangeType}>
                <option value="" key="A" >inconnu</option>
                {plantTypes.map((item, index) => {
                  return (<option value={item.type} key={index} >{item.type}</option>)
                })}

              </select>
            </div>

            {categories.length >= 2 &&
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select onChange={handleChangeCategory} defaultValue={categoryOfPlant} required >
                  <option value="" key="CategoryNone" >Aucune</option>
                  {categories.map((cat, index) => {
                    return (<option value={cat} key={index} >{cat}</option>)
                  })}
                </select>
              </div>
            }
            <div className="form-group">

              <label htmlFor="description">Description</label>
              <textarea id="description" ref={descriptionRef} defaultValue={description}/>
           
            </div>
          </div>
          <div className="watering">
            <h3 className="add-subtitle">Arrosage</h3>
            <div className="form-group">
              <label htmlFor="frequency">Fréquence - Chaque</label>
              <input name="frequency" type="number" defaultValue="7" min="1" className="form-control" ref={frequencyRef}
              />
              <label htmlFor="lastWater">jours</label>
            </div>

            <div className="form-group">
              <label htmlFor="lastWater">Dernier - Il y a</label>
              <input name="lastWater" type="number" min="0" className="form-control" ref={lastWaterRef}

                required />
              <label htmlFor="lastWater">jours</label>
            </div>
          </div>
        </div>
        <button className="stdBtn dark">Ajouter cette plante</button>

      </form>

    </div>
  );
}
