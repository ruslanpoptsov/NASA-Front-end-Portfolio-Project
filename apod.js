// Set up variables for the API endpoint and API key
const apiEndpoint = 'https://api.nasa.gov/planetary/apod';
const apiKey = 'fbO5zHnzxfre2jhv5Lz5MabJlc2s8ltvd0g93voZ';

// Function to fetch data from the NASA API
async function fetchData(date) {
    // Build the API URL with the endpoint, API key, and date parameter
    const apiUrl = `${apiEndpoint}?api_key=${apiKey}&date=${date}`;

    // Use the fetch function to make the API request
    const response = await fetch(apiUrl);

    // Parse the response as JSON
    const data = await response.json();

    // Check if there was an error
    if (data.error) {
        // Update the page with an error message
        updateErrorMessage(data.error.message);
    } else {
        // Update the page with the data from the API
        updatePage(data);
        clearErrorMessage();
    }
}

// Function to update the page with data from the API
function updatePage(data) {
    // Get the elements on the page where we want to display the data
    const titleElement = document.querySelector('#title');
    const imageElement = document.querySelector('#image');
    const explanationElement = document.querySelector('#explanation');

    // Update the elements with the data from the API
    titleElement.textContent = data.title;

    if (data.media_type === "image") {
        imageElement.src = data.url;
    } else if (data.media_type === "video") {
        imageElement.src = "";
    }

    explanationElement.textContent = data.explanation;
}

// Function to update the page with an error message
function updateErrorMessage(message) {
    const errorMessageElement = document.querySelector('#error-message');
    errorMessageElement.textContent = message;
}

// Function to clear any error messages from the page
function clearErrorMessage() {
    const errorMessageElement = document.querySelector('#error-message');
    errorMessageElement.textContent = '';
}

// Function to handle form submission
function handleFormSubmit(event) {
    // Prevent the default behavior of the form
    event.preventDefault();

    // Get the value of the date input field
    const dateInput = document.querySelector('#date-input');
    const date = dateInput.value;

    // Fetch data from the NASA API for the specified date
    fetchData(date);
}

// Get the form element and add an event listener for form submission
const formElement = document.querySelector('#form');
formElement.addEventListener('submit', handleFormSubmit);

// Call the fetchData function when the page loads to display today's APOD
fetchData(new Date().toISOString().slice(0,10));
