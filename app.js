const key = "f39943c1400d9f757dc4b90507d5c514";
const baseURL = 'http://api.weatherstack.com/current?'

// http://api.weatherstack.com/current
// ? access_key = YOUR_ACCESS_KEY
// & query = New York

const formEl = document.querySelector('form');
const details = document.querySelector('.details');

formEl.addEventListener('submit', (e) => {
   e.preventDefault();
   details.innerHTML = '<h1>Loading</h1>';

   const location = e.target.location.value;
   weatherApp(location);

})

async function weatherApp(location) {
   const data = await fetchAPI(location);
   generateHTML(data);
}


async function fetchAPI(location) {
   const queryURL = `${baseURL}access_key=${key}&query=${location}`;
   const res = await fetch(queryURL);
   const data = await res.json();
   console.log(data);
   console.log(data.current.weather_icons[0]);
   return data;
}

console.log(key);

function generateHTML(data) {
   const html = /*html*/ `
   <img src="${data.current.weather_icons[0]}" alt="Weather Icon" width="50px" height="50px">
   <h1>${data.location.name}</h1>
   <h2 class="temp">${data.current.temperature}°c</h2>
   <h3 class="status">${data.current.weather_descriptions[0]}</h3>
   <div class="more-info">
      <p class="info-1">Feels like ${data.current.feelslike}°c</p>
      <p class="info-2">Precipitation: ${data.current.precip}</p>
      <p class="info-3">Windpeed ${data.current.wind_speed}</p>
      <p class="info-4">Visibility ${data.current.visibility}</p>
      <p class="info-5">Query: ${data.request.query}</p>
   </div>
`;
   details.innerHTML = html;
}