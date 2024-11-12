import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDogById } from '../apiManager';

export const DogDetails = () => {
  const [dog, setDog] = useState({});
  const { dogId } = useParams();

  const fetchDogDetails = () => {
    if (dogId) {
      getDogById(dogId).then(setDog);
    }
  };

  useEffect(() => {
    fetchDogDetails();
  }, [dogId]);

  useEffect(() => {
    if (location.state?.refresh) {
      fetchDogDetails();
    }
  }, [location.state]);

  return (
    <>
      <p>
        {dog.name} is currently being walked by{' '}
        {dog.walker ? dog.walker.name : 'no one'}.
      </p>
    </>
  );
};
