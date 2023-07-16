// Set up variables for the API endpoint
const apiEndpoint = 'https://images-api.nasa.gov/search';
const apiKey = 'fbO5zHnzxfre2jhv5Lz5MabJlc2s8ltvd0g93voZ';

// Function to fetch data from the NASA API
async function fetchData() {
  // Set up variables for the search query and media type parameters
  const q = 'apollo 11';
  const mediaType = 'video';

  // Build the API URL with the endpoint, q, and media_type parameters
  const apiUrl = `${apiEndpoint}?q=${q}&media_type=${mediaType}`;

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
  const videosElement = document.querySelector('#videos');

  // Create a new element to display the data
  const element = document.createElement('div');

  // Add content to the element
  element.innerHTML = `
    <h3>Videos for "${data.collection.metadata.total_hits}" results found:</h3>
    ${data.collection.items.map(item => `
      <div>
        <h4>${item.data[0].title}</h4>
        ${item.data[0].description}
        ${item.links.filter(link => link.render === "mp4").map(link => `<video src="${link.href}" controls></video>`).join('')}
      </div>
    `).join('')}
  `;

  // Append the element to the videosElement
  videosElement.appendChild(element);
}

// Call the fetchData function when the page loads
fetchData();
