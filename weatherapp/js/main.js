import { getWeatherByCity } from "./apiService.js";

const viewElements = {};

const getDomElement = id => {
    return document.getElementById(id);
}

const connectHTMLElements = () => {
    // App containers
    viewElements.mainContainer = getDomElement('mainContainer');
    viewElements.weatherSearchView = getDomElement('weatherSearchView');
    viewElements.weatherForecastView = getDomElement('weatherForecastView');
    // Searching system elements
    viewElements.searchInput = getDomElement('searchInput');
    viewElements.searchButton = getDomElement('searchButton');
    // Weather icons
    viewElements.weatherCity = getDomElement('weatherCity');
    viewElements.weatherIcon = getDomElement('weatherIcon');
    // Temperatures
    viewElements.weatherCurrentTemp = getDomElement('weatherCurrentTemp');
    viewElements.weatherMaxTemp = getDomElement('weatherMaxTemp');
    viewElements.weatherMinTemp = getDomElement('weatherMinTemp');
    // Return button
    viewElements.returnToSearchBtn = getDomElement('returnToSearchBtn');
}

const setupListeners = () => {
    viewElements.searchInput.addEventListener('keydown', onEnterSubmit);
    viewElements.searchButton.addEventListener('click', onClickSubmit);
    viewElements.returnToSearchBtn.addEventListener('click', returnToSearch);
}

const initializeApp = () => {
    connectHTMLElements();
    setupListeners();
}


const onEnterSubmit = event => {
    if (event.key === 'Enter') {
        fadeInOut();
        let query = viewElements.searchInput.value;
        getWeatherByCity(query).then(data => {
            displayWeatherData(data);
        });
        viewElements.searchInput.value = "";
    }
}

const onClickSubmit = () => {
    fadeInOut();
    let query = viewElements.searchInput.value;
    getWeatherByCity(query).then(data => {
        displayWeatherData(data);
    });
    viewElements.searchInput.value = "";
}

const displayWeatherData = data => {
    fadeOutAndSwitch();
    // Weather icons
    viewElements.weatherCity.innerText = data.name;
    viewElements.weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    // Temperatures
    const currTemp = data.main.temp;
    const maxTemp = data.main.temp_max;
    const minTemp = data.main.temp_min;

    viewElements.weatherCurrentTemp.innerText = `Current temperature: ${currTemp}°C`;
    viewElements.weatherMaxTemp.innerText = `Maximum temperature: ${maxTemp}°C`;
    viewElements.weatherMinTemp.innerText = `Minimum temperature: ${minTemp}°C`;
}


const returnToSearch = () => {
    fadeInOut();
    fadeOutAndSwitch();
}

const fadeInOut = () => {
    if (viewElements.mainContainer.style.opacity === '1' || viewElements.mainContainer.style.opacity === '') {
        viewElements.mainContainer.style.opacity = '0';
    } else {
        viewElements.mainContainer.style.opacity = '1';
    }
}

const switchView = () => {
    if (viewElements.weatherSearchView.style.display !== 'none') {
        viewElements.weatherSearchView.style.display = 'none';
        viewElements.weatherForecastView.style.display = 'grid';
    } else {
        viewElements.weatherForecastView.style.display = 'none';
        viewElements.weatherSearchView.style.display = 'block';
    }
}

const fadeOutAndSwitch = () => {
    setTimeout(() => {
        switchView();
        fadeInOut()
    }, 500 );
}

document.addEventListener('DOMContentLoaded', initializeApp)