import './CreateGarden.scss';
import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faCircleMinus } from "@fortawesome/free-solid-svg-icons";
import { auth } from "../../firebase/config";
import { allUsers } from "../../firebase/config"
import { doc, updateDoc } from "firebase/firestore";


export default function CreateGarden({setModal}) {
  const gardenNameRef = useRef()
  const categories = useRef([]);


  const addCategories = (el) => {
    if (el && !categories.current.includes(el)) {
      categories.current.push(el)
    }
  }

  const [inputList, setInputList] = useState([]);

  const handleAdd = () => {
    const lastInput = inputList.length + 1;
    setInputList([...inputList, "category-" + lastInput]);
  };

  const handleDelete = () => {
    setInputList((lastItems) =>
      lastItems.filter((item, i) => i !== inputList.length - 1)
    );
    categories.current.pop()
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const categoriesList = categories.current.map(input => input.value)
    const docRef = doc(allUsers, auth.currentUser.uid);
    await updateDoc(docRef, { gardenName: gardenNameRef.current.value, categories: categoriesList });
    setModal(true)
   
  }

  // form (form-collection)
  //contour
  //form-group
  //form-group
  //label
  //input
  //btn

  return (
<form onSubmit={handleSubmit} className="form-collection ">

      <div className='contour'>
        <div className="form-group">
          <label htmlFor="name">Choisis le nom de ton jardin&nbsp;:</label>
          <input id="name"
            type="text"
            className="form-control"
            ref={gardenNameRef}
            required />
        </div>
        <div className="form-group">
          <label>Tu peux diviser tes plantes en categories
            (e.g. selon emplacements, types de plantes ou autres)</label>

          <div className="category-container">
            <div className="icon-container">
              <div className="iconRound" onClick={handleAdd}>
                <FontAwesomeIcon icon={faCirclePlus} />
              </div>
              {inputList.length > 0 &&
                <div className="iconRound" onClick={handleDelete}>
                  <FontAwesomeIcon icon={faCircleMinus} />
                </div>
              }
            </div>
            {inputList.map((input, i) => {
              return (
                <input
                  name={"category-" + (i + 1)}
                  type="text"
                  key={i}
                  placeholder={"category-" + (i + 1)}
                  ref={addCategories}
                  required
                />
              );
            })}
          </div>
        </div>
      </div>

      <button className="stdBtn dark">Valider</button>
    </form>
  );
}
