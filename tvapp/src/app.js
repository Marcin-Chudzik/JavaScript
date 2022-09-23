import { mapListToDOMElements } from './domInteractions.js';

class TvMaze {
  constructor() {
    this.viewElements = {};
    this.showNameButtons = {};
    this.selectedName = "Harry";
    this.InitializeApp();
  };


  InitializeApp = () => {
    this.connectDOMElements();
  };

  connectDOMElements = () => {
    // Mapping all DOM elements which have "id" to list.
    const listOfIds = Array.from(document.querySelectorAll('[id]')).map(element => element.id);
    // Mapping all displayed "Shows" to list of their names.
    const listOfShowNames = Array.from(document.querySelectorAll('[data-show-name]')).map(element => element.dataset.showName);
    
    this.viewElements = mapListToDOMElements(listOfIds, 'id');
    this.showNameButtons = mapListToDOMElements(listOfShowNames, 'data-show-name');
  };

  setupListeners = () => {
    Object.keys(this.showNameButtons).forEach(showName => {
      this.showNameButtons[showName].addEventListener('click', this.setCurrentNameFilter);
    });
  };

  setCurrentNameFilter = () => {
    this.selectedName = event.target.dataset.showName;
  };

};

document.addEventListener('DOMContentLoaded', new TvMaze());
