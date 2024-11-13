import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllWalkerCities, getWalkerById, updateWalker } from '../apiManager';
import './WalkerDetails.css';

export const WalkerDetails = () => {
  const [walker, setWalker] = useState({});
  const [checkedCities, setCheckedCities] = useState({});
  const [editedWalkerObj, setEditedWalkerObj] = useState({});
  const [walkerCities, setWalkerCities] = useState([]);
  const { walkerId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    getWalkerById(walkerId).then((walkerData) => {
      setWalker(walkerData);

      // Initialize checkedCities with walker’s cities
      const initialCheckedCities = {};
      const initialCityIds = [];
      walkerData.cities.forEach((city) => {
        initialCheckedCities[city.cityId] = true; // Set to true if walker is assigned to this city
        initialCityIds.push(city.cityId);
      });

      const selectedWalkerCities = initialCityIds
        .map((cityId) => {
          return walkerCities.find((wc) => wc.cityId === cityId); // Find the corresponding WalkerCity object
        })
        .filter((wc) => wc !== undefined); // Filter out undefined values in case no match is found

      setCheckedCities(initialCheckedCities);

      setEditedWalkerObj({ ...walkerData, cities: selectedWalkerCities });
    });
  }, [walkerId, walkerCities]);

  useEffect(() => {
    getAllWalkerCities().then(setWalkerCities);
  }, [walkerId]);

  const handleCheckBoxChange = (cityId) => {
    // Toggle checked state for the selected city
    setCheckedCities((prevCheckedCities) => {
      const updatedCheckedCities = {
        ...prevCheckedCities,
        [cityId]: !prevCheckedCities[cityId], // Toggle the checked state
      };

      // Update the editedWalkerObj with the selected city IDs
      const selectedCityIds = Object.keys(updatedCheckedCities)
        .filter((id) => updatedCheckedCities[id]) // Get the IDs where the value is true (checked)
        .map(Number); // Convert the IDs to numbers

      // Map the selected cityIds to WalkerCity objects (like in handleUpdateBtn)
      const selectedWalkerCities = selectedCityIds
        .map((cityId) => {
          return walkerCities.find((wc) => wc.cityId === cityId); // Find the corresponding WalkerCity object
        })
        .filter((wc) => wc !== undefined); // Filter out undefined values in case no match is found

      setEditedWalkerObj({
        ...editedWalkerObj,
        cities: selectedWalkerCities, // Set the cities property with the selected city IDs
      });

      return updatedCheckedCities; // Return the updated checked cities state
    });
  };

  const handleOnChange = (event) => {
    const copyObj = { ...editedWalkerObj };
    copyObj[event.target.name] = event.target.value;

    setEditedWalkerObj(copyObj);
  };

  const handleUpdateBtn = (event) => {
    event.preventDefault();
    if (editedWalkerObj.cities) {
      const foundWalkerCities = editedWalkerObj.cities
        .map((cityId) => {
          // Find the WalkerCity with the matching cityId
          return walkerCities.find((wc) => wc.cityId === cityId); // Changed city.id to cityId
        })
        .filter((wc) => wc !== undefined); // Filter out undefined values in case no match is found

      setEditedWalkerObj({ ...editedWalkerObj, cities: foundWalkerCities });

      updateWalker(walkerId, editedWalkerObj).then(() => {
        navigate('/walkers');
      });
    }
  };

  return (
    <>
      <h2>Edit Walker info</h2>
      <form className="walker-info-form">
        <label id="name" name="name">
          Name:
        </label>
        <input
          type="text"
          name="name"
          value={editedWalkerObj.name ? editedWalkerObj.name : ''}
          onChange={handleOnChange}
        />
        <label>Cites:</label>
        {walker.cities?.map((city) => {
          return (
            <div key={city.cityId}>
              <label>
                {city.city.name}
                <input
                  type="checkbox"
                  checked={checkedCities[city.cityId] || false}
                  onChange={() => handleCheckBoxChange(city.cityId)}
                />
              </label>
            </div>
          );
        })}
        <button onClick={handleUpdateBtn}>Update</button>
      </form>
    </>
  );
};
