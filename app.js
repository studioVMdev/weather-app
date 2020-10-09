const key = "f39943c1400d9f757dc4b90507d5c514";
const baseURL = 'http://api.weatherstack.com/current?'

const details = document.querySelector('.details');
const getWeatherBtn = document.querySelector('.get-weather');

let coords = "";

function getLocation() {
   if ('geolocation' in navigator) {
      /* geolocation is available */
      navigator.geolocation.getCurrentPosition((position) => {
         coords = position.coords.latitude + "," + position.coords.longitude;
         weatherApp(coords);
      });
   } else {
      /* geolocation IS NOT available */
      details.innerHTML = "Geolocation not available";
   }
}

//Weather information is delivered on click

// getWeatherBtn.addEventListener('click', (e) => {
//    e.preventDefault();
//    getLocation();

// })

//Weather information is delivered on window load

window.addEventListener('load', (e) => {
   e.preventDefault();
   getLocation();
   
})


async function weatherApp() {
   const data = await fetchAPI(coords);
   generateHTML(data);
}


async function fetchAPI() {
   const queryURL = `${baseURL}access_key=${key}&query=${coords}`;
   const res = await fetch(queryURL);
   const data = await res.json();

   console.log(data);
   return data;
}

function generateHTML(data) {
   const html = /*html*/ `
   <img src="${data.current.weather_icons[0]}" alt="Weather Icon" width="50px" height="50px">
   <h1>${data.location.name}</h1>
   <h2 class="temp">${data.current.temperature}°c</h2>
   <h3 class="status">${data.current.weather_descriptions[0]}</h3>
   <div class="more-info">
      <p class="info">Feels like ${data.current.feelslike}°c</p>
      <p class="info">Precipitation: ${data.current.precip}</p>
      <p class="info">Windpeed ${data.current.wind_speed}</p>
      <p class="info">Visibility ${data.current.visibility}</p>
      <p class="info">Your coord are: ${coords}</p>
      <p class="info">Query: ${data.request.query}</p>
   </div>
`;
   details.innerHTML = html;
}