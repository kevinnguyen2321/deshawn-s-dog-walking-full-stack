import {
  getAllDogs,
  getGreeting,
  getWalkerById,
  removeDog,
  updateWalkerForDog,
} from './apiManager';
import { useEffect, useState } from 'react';
import './Home.css';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

export default function Home() {
  const [greeting, setGreeting] = useState({
    message: 'Not Connected to the API',
  });
  const [dogs, setDogs] = useState([]);
  const [filteredDogs, setFilteredDogs] = useState([]);
  const [walker, setWalker] = useState({});

  const location = useLocation();

  let { walkerId } = useParams();
  walkerId = parseInt(walkerId);

  const fetchAndSetAllDogs = () => {
    getAllDogs()
      .then(setDogs)
      .catch(() => {
        console.log('Unable to retrieve dogs');
      });
  };

  const navigate = useNavigate();

  useEffect(() => {
    getGreeting()
      .then(setGreeting)
      .catch(() => {
        console.log('API not connected');
      });
  }, []);

  useEffect(() => {
    fetchAndSetAllDogs();
  }, []);

  useEffect(() => {
    if (walkerId) {
      getWalkerById(walkerId).then(setWalker);
    }
  }, [walkerId]);

  useEffect(() => {
    // Check if both walker and dogs data are loaded before filtering
    if (walker && dogs.length > 0) {
      const filtered = dogs.filter(
        (dog) =>
          dog.walkerId !== walkerId && // Exclude dogs currently walked by this walker
          walker.cities?.some((wc) => wc.cityId === dog.cityId) // Include dogs in the same city as the walker
      );
      setFilteredDogs(filtered);
    }
  }, [walker, dogs, walkerId]);

  const handleAddNewDogClick = () => {
    navigate('/new-dog-form');
  };

  const handleRemoveDog = (id) => {
    removeDog(id).then(() => {
      fetchAndSetAllDogs();
    });
  };

  const handleAssignWalkerBtn = (dogId, dogPropertyObj) => {
    updateWalkerForDog(dogId, dogPropertyObj).then(() => {
      navigate(`/dog-details/${dogId}`, { state: { refresh: true } });
    });
  };

  return (
    <>
      <p>{greeting.message}</p>
      <div className="dogs-wrapper">
        {location.pathname === `/available-dogs/${walkerId}` ? (
          <h2>Available Dogs</h2>
        ) : (
          <h2>Dog List</h2>
        )}
        <ul className="dog-list-wrapper">
          {location.pathname === `/available-dogs/${walkerId}`
            ? filteredDogs.map((dog) => {
                return (
                  <li key={dog.id}>
                    <Link to={`/dog-details/${dog.id}`}>{dog.name}</Link>
                    <button
                      onClick={() => handleRemoveDog(dog.id)}
                      className="remove-btn"
                    >
                      Remove
                    </button>
                    <button
                      onClick={() =>
                        handleAssignWalkerBtn(dog.id, {
                          id: dog.id,
                          name: dog.name,
                          cityId: dog.cityId,
                          walkerId: dog.walkerId,
                        })
                      }
                    >
                      Assign {walker.name}
                    </button>
                  </li>
                );
              })
            : dogs.map((dog) => {
                return (
                  <li key={dog.id}>
                    <Link to={`/dog-details/${dog.id}`}>{dog.name}</Link>
                    <button
                      onClick={() => handleRemoveDog(dog.id)}
                      className="remove-btn"
                    >
                      Remove
                    </button>
                  </li>
                );
              })}
        </ul>
        {location.pathname === '/' && (
          <button onClick={handleAddNewDogClick}>Add new dog</button>
        )}
      </div>
    </>
  );
}
