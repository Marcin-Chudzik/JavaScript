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
}

const initializeApp = () => {
    connectHTMLElements();
    setupListeners();
}


const onEnterSubmit = event => {
    if (event.key === 'Enter') {
        let query = viewElements.searchInput.value;
        getWeatherByCity(query);
        viewElements.searchInput.value = "";
    }
}

const onClickSubmit = () => {
    
}

document.addEventListener('DOMContentLoaded', initializeApp)