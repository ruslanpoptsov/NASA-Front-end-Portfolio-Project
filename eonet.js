// Set up variables for the API endpoint and API key
const apiEndpoint = 'https://eonet.sci.gsfc.nasa.gov/api/v3/events';
const apiKey = 'fbO5zHnzxfre2jhv5Lz5MabJlc2s8ltvd0g93voZ';

// Function to fetch data from the NASA API
async function fetchData() {
  // Build the API URL with the endpoint, API key, and days parameter
  const apiUrl = `${apiEndpoint}?api_key=${apiKey}&days=30`;

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
  const eonetElement = document.querySelector('#eonet');

  // Create a new element to display the data
  const element = document.createElement('div');

  // Add content to the element
  element.innerHTML = `
    <h3>Natural Events for the Past 30 Days</h3>
    <ul>
      ${data.events.map(event => `<li>${event.title}</li>`).join('')}
    </ul>
  `;

  // Append the element to the eonetElement
  eonetElement.appendChild(element);
}

// Call the fetchData function when the page loads
fetchData();
