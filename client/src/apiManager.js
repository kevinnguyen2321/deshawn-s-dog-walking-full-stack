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

export const getAllCities = async () => {
  const res = await fetch('/api/cities');
  return res.json();
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
  } catch (error) {
    console.error('Error:', error); // Handle any error that occurs
  }
};
