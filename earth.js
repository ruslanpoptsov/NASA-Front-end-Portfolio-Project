// Set up variables for the API endpoint and API key
const apiEndpoint = 'https://api.nasa.gov/planetary/earth/assets';
const apiKey = 'fbO5zHnzxfre2jhv5Lz5MabJlc2s8ltvd0g93voZ';

// Function to fetch data from the NASA API
async function fetchData() {
  // Set up variables for the latitude, longitude, and date parameters
  const lat = '1.5';
  const lon = '100.75';
  const date = '2018-01-01';

  // Build the API URL with the endpoint, API key, and lat, lon, and date parameters
  const apiUrl = `${apiEndpoint}?api_key=${apiKey}&lat=${lat}&lon=${lon}&date=${date}`;

  // Use the fetch function to make the API request
  const response = await fetch(apiUrl);

  // Parse the response as JSON
  const data = await response.json();

  // Update the page with the data from the API
  updatePage(data);
}

// Function to update the page with data from the API
function updatePage(data) {
  // Get the element on the page where we want to display the data
  const earthElement = document.querySelector('#earth');

  // Create a new element to display the data
  const element = document.createElement('div');

  // Add content to the element
  element.innerHTML = `
    <h3>Earth Assets for ${data.results[0].date}</h3>
    <img src="${data.results[0].url}">
  `;

  // Append the element to the earthElement
  earthElement.appendChild(element);
}

// Call the fetchData function when the page loads
fetchData();
