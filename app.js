
//Interação!!!
const searchInput = document.getElementById('search-input');
const cityButton = document.getElementById('city-button')

//Exibição!!!
const dateCurrent = document.getElementById('date-current');
const nameCity = document.getElementById('name-city');
const weatherIcon =document.getElementById('weather-icon');
const weatherDescription = document.getElementById('weather-description');
const currentTemperature = document.getElementById('current-temperature');
const winSpeed = document.getElementById('win-speed');
const feelsLikeTemperature = document.getElementById('feels-like-temperature');
const currentHumidity = document.getElementById('current-humidity');
const sunriseTime = document.getElementById('sunrise-time');
const sunsetTime = document.getElementById('sunset-time');

const api_key = "15a5fc492ea4fd432625ea7d73726621";

cityButton.addEventListener("click", () => {
    let nameCity = searchInput.value
    cityWeather(nameCity)
})


//Buscando  a localização exata!!

navigator.geolocation.getCurrentPosition(
    (position) => {
        let lat = position.coords.latitude
        let lon = position.coords.longitude

        getCurrentLocationWeather(lat, lon)
    },
    (err) => {
        if(err.cod === 1){
        alert("Localização negado pelo usuário, busque manualmente pela barra de pesquisa.")
    }else{
        conslosde.log(err)
    }
    }
)

function getCurrentLocationWeather(lat, lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${api_key}`)
    .then((response) => response.json())
    .then((demo) =>displayWather(demo))
}

//https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}


function cityWeather(nameCity){

    weatherIcon.src = `./assets/loading-icon.svg`

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${nameCity}&units=metric&lang=pt_br&appid=${api_key}`)
    .then((response) => response.json())
    .then((demo) =>displayWather(demo))
}
function displayWather(demo){
let{ 
    dt,
    name,
    weather: [{ icon, description}],
    main: { temp, feels_like, humidity},
    wind:{ speed },
    sys: { sunrise, sunset },    
} = demo
 
dateCurrent.textContent = formatDate (dt)
nameCity.textContent = name;
weatherIcon.src = `./assets/${icon}.svg`;
weatherDescription.textContent = description;
currentTemperature.textContent = `${Math.round(temp)}ºC`;
winSpeed.textContent = `${Math.round(speed * 3.6)}km/h`;
feelsLikeTemperature.textContent = `${Math.round(feels_like)}ºC`;
currentHumidity.textContent = `${humidity}%`;
sunriseTime.textContent = formatTime (sunrise);
sunsetTime.textContent = formatTime(sunset);
}
function formatDate(epochTime){
    let date = new Date(epochTime * 1000)
    let formattedDate = date.toLocaleDateString('pt-BR', { month: "long", day: 'numeric'})
    return `Hoje, ${formattedDate}`
}

function formatTime (epochTime){
    let date = new Date(epochTime * 1000)
    let hours = date.getHours()
    let minutes = date.getMinutes()
    return `${hours}:${minutes}`
}