const searchInput = document.getElementById('search');
const subscribeInput = document.getElementById('subscribe-email');
const subscribeButton = document.getElementById('subscribe-button');

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (pos) {
        const lat = pos.coords.latitude;
        const long = pos.coords.longitude;
        console.log(lat, "lat");
        console.log(long, "long");
        getWeatherData(`${lat},${long}`);
    }, function (error) {
        console.error("Error getting geolocation:", error);
    });
} else {
    console.log("Geolocation is not supported by this browser.");
}

async function getWeatherData(query) {
    try {
        let res = await fetch(`https://api.weatherapi.com/v1/forecast.json?q=${query}&days=3&key=e1d41ecf1f474848acc221757241706`);
        let data = await res.json();
        console.log(data);
        displayWeather(data);
        displayTom(data); 
        displayAfterTom(data); 
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

searchInput.addEventListener('input', function (e) {
    getWeatherData(e.target.value);
});

function displayWeather(data) {
    const lastUpdated = new Date(data.current.last_updated);
    const lastUpdatedFormatted = lastUpdated.toLocaleString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    console.log(lastUpdatedFormatted, 'Last Updated Date');

    const cityName = data.location.name;
    console.log(cityName, 'cityName');
    const todayDegree = data.current.temp_c;
    const todayCondition = data.current.condition.text;
    const toDayHumidity = data.current.humidity;
    const todayWind = data.current.wind_kph;
    const windDirection = data.current.wind_dir;

    document.getElementById('day1').innerHTML = `
        <div class="day d-flex justify-content-between" id="day1">
            <span>${lastUpdatedFormatted}</span>
        </div>`;
    document.getElementById('day2').innerHTML = `
        <div class="day d-flex justify-content-between" id="day2">
            <span>${data.forecast.forecastday[1].date}</span>
        </div>`;
    document.getElementById('day3').innerHTML = `
        <div class="day d-flex justify-content-between" id="day3">
            <span>${data.forecast.forecastday[2].date}</span>
        </div>`;

    document.getElementById('location1').innerHTML = `<div class="location" id="location1">${cityName}</div>`;
    document.getElementById('todayDegree').innerHTML = `
        <div class="degree" id="todayDegree">
            <div class="num fs-3 fw-bold">${todayDegree}<sup>o</sup>C</div>
        </div>`;
    document.getElementById('todayCondition').innerHTML = `
        <div class="custom" id="todayCondition">${todayCondition}</div>`;


    document.getElementById('humidity').innerHTML = `<span id="humidity">  <i class="fa-solid fa-umbrella"></i> ${toDayHumidity} %</span>`;
    document.getElementById('windDirection').innerHTML = `<span id="windDirection" > <i class="fa-solid fa-compass"></i> ${windDirection} </span>`;
    document.getElementById('wind').innerHTML = `<span id="wind"> <i class="fa-solid fa-wind"></i> ${todayWind} km/h</span>`;

    subscribeButton.addEventListener('click', function (e) {
        e.preventDefault();
        const email = subscribeInput.value;
        console.log('Subscribing email:', email);
    });
}

function displayTom({ forecast, location }) {
    const cityName = location.name;
    const tomDegree = forecast.forecastday[1].day.maxtemp_c;
    const tomCondition = forecast.forecastday[1].day.condition.text;
    const tomHumidity = forecast.forecastday[1].day.avghumidity;
    const tomWind = forecast.forecastday[1].day.maxwind_kph;

    document.getElementById('location2').innerHTML = `<div class="location" id="location2">${cityName}</div>`;
    document.getElementById('tomDegree').innerHTML = `
        <div class="degree" id="tomDegree">
            <div class="num fs-3">${tomDegree}<sup>o</sup>C</div>
        </div>`;
    document.getElementById('tomCondition').innerHTML = `
        <div class="custom" id="tomCondition">${tomCondition}</div>`;
    document.getElementById('humidity2').innerHTML = `
        <span id="humidity2">  <i class="fa-solid fa-umbrella"></i> ${tomHumidity}%</span>`;
    document.getElementById('wind2').innerHTML = `
        <span id="wind2"> <i class="fa-solid fa-wind"></i> ${tomWind} km/h</span>`;
}

function displayAfterTom({ forecast, location }) {
    const cityName = location.name; 
    const afterTomDegree = forecast.forecastday[2].day.maxtemp_c; 
    const afterTomCondition = forecast.forecastday[2].day.condition.text;
    const afterTomHumidity = forecast.forecastday[2].day.avghumidity;
    const afterTomWind = forecast.forecastday[2].day.maxwind_kph;

    document.getElementById('location3').innerHTML = `<div class="location" id="location3">${cityName}</div>`;
    document.getElementById('afterTomDegree').innerHTML = `
        <div class="degree" >
            <div class="num fs-3" id="afterTomDegree">${afterTomDegree}<sup>o</sup>C</div>
        </div>`;
    document.getElementById('afterTomCondition').innerHTML = `
        <div class="custom" id="afterTomCondition">${afterTomCondition}</div>`;
    document.getElementById('afterTomHumidity').innerHTML = `
        <span id="afterTomHumidity">  <i class="fa-solid fa-umbrella"></i> ${afterTomHumidity}%</span>`;
    document.getElementById('afterTomWind').innerHTML = `
        <span id="afterTomWind"> <i class="fa-solid fa-wind"></i> ${afterTomWind} km/h</span>`;
}
