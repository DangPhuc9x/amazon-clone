// Builtin Backend Class
// Create new HTTP message
// xhr: XmlHttpRequest
const xhr = new XMLHttpRequest();
let responseMessage;

// Create event listener whenever a response message loaded
// Save message and print out
// load: response has loaded status
xhr.addEventListener('load', () => {
    // Receive response from backend
    responseMessage = xhr.response;
    console.log(responseMessage);
});

// Setup the request to give to backend
// HTTP: Hypertext Transfer Protocol
// URL: Uniform Resource Locator
// (1) : HTTP send message 
//       'GET': Get something from the BACKEND
//       'POST': Want BE to create something
//       'PUT': Update something
//       'DELETE': Delete something
// (2) : Where to send (URL of backend destination)

// Plain text type response
xhr.open('GET', 'https://supersimplebackend.dev');
xhr.open('GET', 'https://supersimplebackend.dev/hello');

// Not supported URL (with error)
// xhr.open('GET', 'https://supersimplebackend.dev/not-supported');

// JSON type response
xhr.open('GET', 'https://supersimplebackend.dev/products/first');

// HTML type response
xhr.open('GET', 'https://supersimplebackend.dev/documentation');

// Image type response
xhr.open('GET', 'https://supersimplebackend.dev/images/apple.jpg');

// Send mesage across the internet to backend computer
xhr.send();

// Status Code 404
// Starts with 4(FE problem) or 5(BE problem) = Failed
// Starts with 2 = Successed

// Typing URL and press Enter (USING THE BROWSER)
// Send a GET request to BE server
// Display the message on the page