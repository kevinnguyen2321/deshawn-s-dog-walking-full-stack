import { useEffect, useState } from 'react';
import { getAllCities, getAllWalkers, removeWalker } from '../apiManager';
import './Walkers.css';
import { Link, useNavigate } from 'react-router-dom';

export const Walkers = () => {
  const [walkersList, setWalkersList] = useState([]);
  const [filteredWalkerList, setFilteredWalkerList] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCityId, setSelectedCityId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    getAllWalkers().then((walkers) => {
      setWalkersList(walkers); // Set the full list
      setFilteredWalkerList(walkers); // Initialize filtered list with full list
    });
  }, []);

  useEffect(() => {
    getAllCities().then(setCities);
  }, []);

  useEffect(() => {
    if (selectedCityId === null) {
      setFilteredWalkerList(walkersList); // Reset to full list if no city is selected
    } else {
      const filteredWalkers = walkersList.filter((walker) =>
        walker.cities.some((city) => city.id === selectedCityId)
      );

      console.log(filteredWalkers); // Log filtered walkers
      setFilteredWalkerList(filteredWalkers);
    }
  }, [selectedCityId, walkersList]);

  const handleSelectionChange = (event) => {
    const cityId = parseInt(event.target.value);
    setSelectedCityId(cityId || null); // Reset to null if no city is selected
  };

  const handleAssignDogBtnClick = (id) => {
    navigate(`/available-dogs/${id}`);
  };

  const handleRemoveWalkerClick = async (id) => {
    await removeWalker(id);

    // Update the full list of walkers by filtering out the removed walker
    const updatedWalkersList = walkersList.filter((walker) => walker.id !== id);
    setWalkersList(updatedWalkersList);

    // Update the filtered list based on the selected city
    if (selectedCityId === null) {
      setFilteredWalkerList(updatedWalkersList); // No filter applied
    } else {
      const updatedFilteredList = updatedWalkersList.filter((walker) =>
        walker.cities.some((city) => city.id === selectedCityId)
      );
      setFilteredWalkerList(updatedFilteredList);
    }
  };

  return (
    <>
      <div className="walker-wrapper">
        <div>
          <h2>List of Walkers</h2>
          <ul className="walkers-list-wrapper">
            {filteredWalkerList.map((walker) => (
              <li key={walker.id}>
                <Link to={`/walker-details/${walker.id}`}>{walker.name}</Link>
                <button
                  onClick={() => handleAssignDogBtnClick(walker.id)}
                  className="assign-dog-btn"
                >
                  Assign dog
                </button>
                <button
                  onClick={() => handleRemoveWalkerClick(walker.id)}
                  className="remove-walker-btn"
                >
                  Remove Walker
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="drop-down-wrapper">
          <select
            name="walkers"
            id="walker-select"
            onChange={handleSelectionChange}
          >
            <option value="">---Please choose a city---</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};
