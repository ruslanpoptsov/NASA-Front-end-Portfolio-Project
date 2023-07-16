// Set up variables for the API endpoint and API key
const apiEndpoint = 'https://api.nasa.gov/EPIC/api/natural';
const apiKey = 'fbO5zHnzxfre2jhv5Lz5MabJlc2s8ltvd0g93voZ';

// Function to fetch data from the NASA API
async function fetchData() {
  // Build the API URL with the endpoint and API key
  const apiUrl = `${apiEndpoint}?api_key=${apiKey}`;

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
  const epicElement = document.querySelector('#epic');

  // Create a new element to display the data
  const element = document.createElement('div');

  // Add content to the element
  element.innerHTML = `
    <h3>EPIC Images for ${data[0].date.slice(0,10)}</h3>
    ${data.map(image => `<img src="https://epic.gsfc.nasa.gov/archive/natural/${image.date.slice(0,4)}/${image.date.slice(5,7)}/${image.date.slice(8,10)}/png/${image.image}.png">`).join('')}
  `;

  // Append the element to the epicElement
  epicElement.appendChild(element);
}

// Call the fetchData function when the page loads
fetchData();
