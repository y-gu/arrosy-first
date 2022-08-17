import React, { useState, useRef, useEffect } from "react";
import { auth } from "../../firebase/config";
import { allUsers } from "../../firebase/config";
import { doc, collection, setDoc, serverTimestamp } from "firebase/firestore";
import useUserInfo from '../../hooks/useUserInfo';
//import plantTypes from '../../data';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "./AddPlant.scss";
import useStorage from "../../hooks/useStorage";
import usePlantTypes from "../../hooks/usePlantTypes";


export default function AddPlant({ setModal, clickedCat }) {

  const [typeOfPlant, setTypeOfPlant] = useState("inconnu");
  const [categoryOfPlant, setCategoryOfPlant] = useState(clickedCat);
  const { categories } = useUserInfo();
  const nameRef = useRef();
  const formRef = useRef();
  const frequencyRef = useRef();
  const lastWaterRef= useRef();


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
  const drawnPlant= useStorage('drawn_plants', 'plant1');
  const imgPlant = imgUrl? imgUrl : drawnPlant;

  const potUrl = useStorage('pots', 'pot1');


  const handleClick = (e) => {
    e.preventDefault()
    setModal(false)
  }

  const handleChangeType = (e) => {
    setTypeOfPlant(e.target.value);
  }

  const handleChangeCategory = (e) => {
    setCategoryOfPlant(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    //const today = Timestamp.fromDate(new Date());
    const today =  Math.floor(new Date().getTime() / 1000);
    //const lastWatered = new Date((today - lastWaterRef.current.value * 86400)*1000);
    const lastWatered = Math.floor(today - lastWaterRef.current.value * 86400)
    //const whenToWater =new Date((Timestamp.fromDate(lastWatered).seconds + frequencyRef.current.value * 86400)*1000)
    const whenToWater = lastWatered + frequencyRef.current.value * 86400
    console.log('todat' + today)
    console.log('ici'+ whenToWater)
    const newPlantRef = doc(collection(doc(allUsers, auth.currentUser.uid), 'gardenCollection'))
    await setDoc(newPlantRef, { name: nameRef.current.value, type: typeOfPlant, frequency: frequencyRef.current.value, category: categoryOfPlant, imgUrl: imgPlant, potUrl: potUrl, createdAt:serverTimestamp(), lastWatered: lastWatered, waterAllDates: [] , whenToWater: whenToWater });
    formRef.current.reset();
  };
  return (


    <div className="backgroundModal" >
      {/* <div className="roundOne"></div>
      <div className="roundTwo"></div> */}

      <form onSubmit={handleSubmit} className="form-add" ref={formRef} >
        {/* <img src={imgUrl} alt="" /> */}
        {/* {plantT.map((item)=>{
return(
  <>
<p>{item.type}</p>
 <img src={item.imgUrl} alt="" />
 </>
)
})} */}
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
          </div>
          <div className="watering">
            <h3 className="add-subtitle">Arrosage</h3>
            <div className="form-group">
              <label htmlFor="frequency">Fréquence - Chaque</label>
              <input name="frequency" type="number" defaultValue="7" className="form-control" ref={frequencyRef}
              />
              <label htmlFor="lastWater">jours</label>
            </div>

            <div className="form-group">
              <label htmlFor="lastWater">Dernier - Il y a</label>
              <input name="lastWater" type="number" className="form-control" ref={lastWaterRef}

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
