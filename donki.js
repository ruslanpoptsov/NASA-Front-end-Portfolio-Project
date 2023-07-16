// Set up variables for the API endpoint and API key
const apiEndpoint = 'https://api.nasa.gov/DONKI/notifications';
const apiKey = 'fbO5zHnzxfre2jhv5Lz5MabJlc2s8ltvd0g93voZ';

// Function to fetch data from the NASA API
async function fetchData() {
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().slice(0, 10);

  // Build the API URL with the endpoint, API key, and start_date and end_date parameters
  const apiUrl = `${apiEndpoint}?api_key=${apiKey}&start_date=${today}&end_date=${today}`;

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
  const donkiElement = document.querySelector('#donki');

  // Create a new element to display the data
  const element = document.createElement('div');

  // Add content to the element
  element.innerHTML = `
    <h3>Space Weather Notifications for ${new Date().toLocaleDateString()}</h3>
    <ul>
      ${data.map(notification => `<li>${notification.messageType}: ${notification.messageIssueTime}</li>`).join('')}
    </ul>
  `;

  // Append the element to the donkiElement
  donkiElement.appendChild(element);
}

// Call the fetchData function when the page loads
fetchData();
