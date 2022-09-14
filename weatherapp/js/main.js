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
        getWeatherByCity(query);
        viewElements.searchInput.value = "";
        fadeOutAndSwitch();
    }
}

const onClickSubmit = () => {
    fadeInOut();
    let query = viewElements.searchInput.value;
    getWeatherByCity(query);
    viewElements.searchInput.value = "";
    fadeOutAndSwitch();
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
        viewElements.weatherForecastView.style.display = 'block';
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