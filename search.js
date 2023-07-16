// Function to update the page with search results
async function updatePage(query) {
    // Set up variables for the API endpoint and API key
    const apiEndpoint = 'https://images-api.nasa.gov/search';
    const apiKey = 'fbO5zHnzxfre2jhv5Lz5MabJlc2s8ltvd0g93voZ';
  
    // Build the API URL with the endpoint, q, and media_type parameters
    const apiUrl = `${apiEndpoint}?q=${query}&media_type=image`;
  
    // Use the fetch function to make the API request
    const response = await fetch(apiUrl);
  
    // Parse the response as JSON
    const data = await response.json();
  
    // Get the element on the page where we want to display the search results
    const resultsElement = document.querySelector('#results');
  
    // Create a new element to display the search results
    const element = document.createElement('div');
  
    // Add content to the element
    element.innerHTML = `
      <h3>Search Results for "${query}"</h3>
      ${data.collection.items.map(item => `
        <div>
          <h4>${item.data[0].title}</h4>
          <img src="${item.links[0].href}" alt="${item.data[0].title}">
        </div>
      `).join('')}
    `;
  
    // Clear any previous search results from the page
    resultsElement.innerHTML = '';
  
    // Append the element to the resultsElement
    resultsElement.appendChild(element);
  }
  