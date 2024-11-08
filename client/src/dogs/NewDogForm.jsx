import { useEffect, useState } from 'react';
import './NewDogForm.css';
import { addNewDog, getAllCities, getAllWalkers } from '../apiManager';

export const NewDogForm = () => {
  const [walkers, setWalkers] = useState([]);
  const [cities, setCities] = useState([]);
  const [newDogForm, setNewDogForm] = useState({});

  useEffect(() => {
    getAllWalkers()
      .then(setWalkers)
      .catch(() => {
        console.log('Unable to fetch walkers');
      });
  }, []);

  useEffect(() => {
    getAllCities()
      .then(setCities)
      .catch(() => {
        console.log('Unable to fetch cities');
      });
  }, []);

  const handleOnChange = (event) => {
    const newDogFormCopy = { ...newDogForm };
    newDogFormCopy[event.target.name] = event.target.value;
    setNewDogForm(newDogFormCopy);
  };

  const handleSubmitBtn = (event) => {
    event.preventDefault();
    //Check to see if all fields are not empty//
    if (!newDogForm.name || !newDogForm.cityId || !newDogForm.walkerId) {
      alert('Please fill out all fields before submitting');
    } else {
      // Make sure user chooses from list of walkers//
      let walkerId = newDogForm.walkerId;
      const foundWalker = walkers.find(
        (walker) =>
          walker.name.toLowerCase().trim() ===
          newDogForm.walkerId.toLowerCase().trim()
      );

      if (!foundWalker) {
        alert(`Please choose from list of walkers
              ${walkers.map((w) => w.name)}
              `);
      }

      //make sure user chooses from list of cities//
      let cityId = newDogForm.cityId;
      const foundCity = cities.find(
        (city) => city.name.toLowerCase() === newDogForm.cityId.toLowerCase()
      );
      if (!foundCity) {
        alert(`Please choose from list of cities
             ${cities.map((city) => city.name)}
            
            `);
      }
      // If user enters in valid city and valid walker//
      if (foundCity && foundWalker) {
        newDogForm.cityId = foundCity.id;
        newDogForm.walkerId = foundWalker.id;
        addNewDog(newDogForm);
      }
    }
  };

  return (
    <>
      <form className="new-dog-form" onSubmit={handleSubmitBtn}>
        <h2>New Dog form</h2>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" onChange={handleOnChange} />
        <label htmlFor="cityId">City</label>
        <input type="text" id="city" name="cityId" onChange={handleOnChange} />
        <label htmlFor="walkerId">Walker</label>
        <input
          type="text"
          id="walker"
          name="walkerId"
          onChange={handleOnChange}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
