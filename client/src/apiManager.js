export const getGreeting = async () => {
  const res = await fetch('/api/hello');
  return res.json();
};

export const getAllDogs = async () => {
  const res = await fetch('/api/dogs');
  return res.json();
};

export const getAllWalkers = async () => {
  const res = await fetch('/api/walkers');
  return res.json();
};

export const getWalkerById = async (id) => {
  const res = await fetch(`/api/walkers/${id}`);
  return res.json();
};

export const removeWalker = async (id) => {
  try {
    const res = await fetch(`/api/walkers/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      throw new Error(
        `Failed to delete dog with id ${id}. Status: ${res.status}`
      );
    }
    console.log(`Dog with id ${id} deleted successfully`);
  } catch (error) {
    console.error(error);
  }
};

export const getAllCities = async () => {
  const res = await fetch('/api/cities');
  return res.json();
};

export const addNewCity = async (city) => {
  try {
    const res = await fetch('/api/cities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(city),
    });

    // Check if the response is OK (status code 200-299)
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }

    const data = await res.json(); // Parse the JSON response
    console.log('Success:', data); // Handle the successful response
    return data;
  } catch (error) {
    console.error('Error:', error); // Handle any error that occurs
  }
};

export const addNewDog = async (dog) => {
  try {
    const res = await fetch('/api/dogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dog),
    });

    // Check if the response is OK (status code 200-299)
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }

    const data = await res.json(); // Parse the JSON response
    console.log('Success:', data); // Handle the successful response
    return data;
  } catch (error) {
    console.error('Error:', error); // Handle any error that occurs
  }
};

export const getDogById = async (id) => {
  try {
    const res = await fetch(`/api/dogs/${id}`);
    return res.json();
  } catch (error) {
    console.error(error);
  }
};

export const removeDog = async (id) => {
  try {
    const res = await fetch(`/api/dogs/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      throw new Error(
        `Failed to delete dog with id ${id}. Status: ${res.status}`
      );
    }
    console.log(`Dog with id ${id} deleted successfully`);
  } catch (error) {
    console.error('Error:', error);
  }
};

export const updateWalkerForDog = async (id, dogObj) => {
  try {
    const res = await fetch(`/api/dogs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dogObj),
    });

    if (!res.ok) {
      throw new Error(`Failed to update dog: ${res.statusText}`);
    }
    return res.json();
  } catch (error) {
    console.error(error);
  }
};

export const getAllWalkerCities = async () => {
  try {
    const res = await fetch('/api/walkerCities');
    return res.json();
  } catch (error) {
    console.error(error);
  }
};

export const updateWalker = async (id, walkerObj) => {
  try {
    const res = await fetch(`/api/walkers/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(walkerObj),
    });

    if (!res.ok) {
      throw new Error(`Failed to update dog: ${res.statusText}`);
    }
  } catch (error) {
    console.error(error);
  }
};
