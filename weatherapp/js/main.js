import { getWeatherByCity } from "./apiService.js";
import { mapListToDOMElements } from "./DOMActions.js";

class WeatherApp {
  constructor() {
    this.viewElements = {};
    this.initalizeApp();
  };

  initalizeApp = () => {
    this.connectDOMElements();
    this.setupListeners();
  }

  connectDOMElements = () => {
    const listOfIds = Array.from(document.querySelectorAll('[id]')).map(element => element.id);
    this.viewElements = mapListToDOMElements(listOfIds);
  };

  setupListeners = () => {
    this.viewElements.searchInput.addEventListener('keydown', this.handleSubmit);
    this.viewElements.searchButton.addEventListener('click', this.handleSubmit);
    this.viewElements.returnToSearchBtn.addEventListener('click', this.returnToSearch);
  };

  handleSubmit = event => {
    if (event.type === 'click' || event.key === 'Enter') {
      this.fadeInOut();
      let query = this.viewElements.searchInput.value;
      getWeatherByCity(query).then(data => {
        this.displayWeatherData(data);
      }).catch(() => {
        this.fadeInOut();
        this.viewElements.searchInput.style.border = '2px solid crimson';
      });
      this.viewElements.searchInput.value = "";
      this.viewElements.searchInput.style.border = 'none';
    };
  };

  fadeInOut = () => {
    if (this.viewElements.mainContainer.style.opacity === '1' || this.viewElements.mainContainer.style.opacity === '') {
      this.viewElements.mainContainer.style.opacity = '0';
    } else {
      this.viewElements.mainContainer.style.opacity = '1';
    };
  };

  switchView = () => {
    if (this.viewElements.weatherSearchView.style.display !== 'none') {
      this.viewElements.weatherSearchView.style.display = 'none';
      this.viewElements.weatherForecastView.style.display = 'grid';
    } else {
      this.viewElements.weatherForecastView.style.display = 'none';
      this.viewElements.weatherSearchView.style.display = 'block';
    };
  };

  fadeOutAndSwitch = () => {
    setTimeout(() => {
      this.switchView();
      this.fadeInOut()
    }, 500);
  };

  returnToSearch = () => {
    this.fadeInOut();
    this.fadeOutAndSwitch();
  };
  
  displayWeatherData = data => {
    this.fadeOutAndSwitch();
    // Weather icons
    this.viewElements.weatherCity.innerText = data.name;
    this.viewElements.weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    // Temperatures
    const currTemp = data.main.temp;
    const maxTemp = data.main.temp_max;
    const minTemp = data.main.temp_min;

    this.viewElements.weatherCurrentTemp.innerText = `Current temperature: ${currTemp}°C`;
    this.viewElements.weatherMaxTemp.innerText = `Maximum temperature: ${maxTemp}°C`;
    this.viewElements.weatherMinTemp.innerText = `Minimum temperature: ${minTemp}°C`;
  };
};

document.addEventListener('DOMContentLoaded', new WeatherApp());
