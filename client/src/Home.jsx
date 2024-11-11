import { getAllDogs, getGreeting } from './apiManager';
import { useEffect, useState } from 'react';
import './Home.css';
import { Link, useNavigate } from 'react-router-dom';

export default function Home() {
  const [greeting, setGreeting] = useState({
    message: 'Not Connected to the API',
  });

  const [dogs, setDogs] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getGreeting()
      .then(setGreeting)
      .catch(() => {
        console.log('API not connected');
      });
  }, []);

  useEffect(() => {
    getAllDogs()
      .then(setDogs)
      .catch(() => {
        console.log('Unable to retrieve dogs');
      });
  }, []);

  const handleAddNewDogClick = () => {
    navigate('/new-dog-form');
  };

  return (
    <>
      <p>{greeting.message}</p>
      <div className="dogs-wrapper">
        <h2>Dog List</h2>
        {/* <ul>
          {dogs.map((dog) => {
            return <li key={dog.id}>{dog.name}</li>;
          })}
        </ul> */}
        <ul className="dog-list-wrapper">
          {dogs.map((dog) => {
            return (
              <li key={dog.id}>
                <Link to={`/dog-details/${dog.id}`}>{dog.name}</Link>
              </li>
            );
          })}
        </ul>
        <button onClick={handleAddNewDogClick}>Add new dog</button>
      </div>
    </>
  );
}
