import { getAllDogs, getGreeting } from './apiManager';
import { useEffect, useState } from 'react';
import './Home.css';

export default function Home() {
  const [greeting, setGreeting] = useState({
    message: 'Not Connected to the API',
  });

  const [dogs, setDogs] = useState([]);

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

  return (
    <>
      <p>{greeting.message}</p>
      <div className="dogs-wrapper">
        <h2>Dog List</h2>
        <ul>
          {dogs.map((dog) => {
            return <li key={dog.id}>{dog.name}</li>;
          })}
        </ul>
      </div>
    </>
  );
}
