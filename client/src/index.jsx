import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Home from './Home';
import { NewDogForm } from './dogs/NewDogForm';
import { DogDetails } from './dogs/DogDetails';
import { Walkers } from './walkers/Walkers';
import { WalkerDetails } from './walkers/WalkerDetails';
import { Cities } from './cities/Cities';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="new-dog-form" element={<NewDogForm />} />
        <Route path="dog-details/:dogId" element={<DogDetails />} />
        <Route path="walkers" element={<Walkers />} />
        <Route path="available-dogs/:walkerId" element={<Home />} />
        <Route path="walker-details/:walkerId" element={<WalkerDetails />} />
        <Route path="cities" element={<Cities />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
