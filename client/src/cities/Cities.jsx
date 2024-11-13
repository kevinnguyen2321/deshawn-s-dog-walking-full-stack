import { useEffect, useState } from 'react';
import { addNewCity, getAllCities } from '../apiManager';

export const Cities = () => {
  const [cities, setCities] = useState([]);
  const [cityObj, setCityObj] = useState({});

  const fetchAndSetAllCities = () => {
    getAllCities().then(setCities);
  };

  useEffect(() => {
    fetchAndSetAllCities();
  }, []);

  const handleOnChange = (event) => {
    const objCopy = { ...cityObj };
    objCopy[event.target.name] = event.target.value;

    setCityObj(objCopy);
  };

  const handleAddBtn = () => {
    addNewCity(cityObj).then(() => {
      fetchAndSetAllCities();
    });
  };

  return (
    <div>
      <h2>List of Cities</h2>
      <ul>
        {cities.map((city) => {
          return <li key={city.id}>{city.name}</li>;
        })}
      </ul>
      <input
        type="text"
        id="city"
        name="name"
        placeholder="city"
        onChange={handleOnChange}
      />
      <button onClick={handleAddBtn}>Add new city</button>
    </div>
  );
};
