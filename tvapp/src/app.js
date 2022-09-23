import { mapListToDOMElements, createDOMElement } from './domInteractions.js';
import { getShowsByKeyWord, getShowById } from './requests.js';

class TvMaze {
  constructor() {
    this.viewElements = {};
    this.showNameButtons = {};
    this.selectedName = "Harry";
    this.InitializeApp();
  };


  InitializeApp = () => {
    this.connectDOMElements();
    this.setupListeners();
    this.fetchAndDisplayShows();
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

  setCurrentNameFilter = event => {
    this.selectedName = event.target.dataset.showName;
    this.fetchAndDisplayShows();
  };

  fetchAndDisplayShows = () => {
    getShowsByKeyWord(this.selectedName).then(shows => this.renderCards(shows));
  };

  renderCards = shows => {
    for (const { show } of shows) {
      this.createShowCard(show);
    };
  };

  createShowCard = show => {
    const divCard = createDOMElement('div', 'card');
    const img = createDOMElement('img', 'card-img-top', null, show.image.medium);
    const divCardBody = createDOMElement('div', 'card-body');
    const h5 = createDOMElement('h5', 'card-title', show.name);
    const p = createDOMElement('p', 'card-text', String(show.summary).replace( /(<([^>]+)>)/ig, ''));
    const btn = createDOMElement('a', 'btn btn-primary', 'Show details');

    divCard.appendChild(img);
    divCard.appendChild(divCardBody);
    divCardBody.appendChild(h5);
    divCardBody.appendChild(p);
    divCardBody.appendChild(btn);

    this.viewElements.showsWrapper.appendChild(divCard);
  };

};

document.addEventListener('DOMContentLoaded', new TvMaze());
