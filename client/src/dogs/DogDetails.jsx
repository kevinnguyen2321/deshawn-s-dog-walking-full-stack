import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDogById, getWalkerById } from '../apiManager';

export const DogDetails = () => {
  const [dog, setDog] = useState({});
  const [walker, setWalker] = useState({});
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
    getWalkerById(dog.walkerId).then(setWalker);
  }, [dog]);

  // useEffect(() => {
  //   if (location.state?.refresh) {
  //     fetchDogDetails();
  //   }
  // }, [location.state]);

  return (
    <>
      <p>
        {dog.name} is currently being walked by{' '}
        {walker ? walker.name : 'no one'}.
      </p>
    </>
  );
};
