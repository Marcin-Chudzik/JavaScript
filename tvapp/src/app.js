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
    // Initializing requirements for valid work.
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
    // Setting a click event listener on all dropdown menu buttons.
    Object.keys(this.showNameButtons).forEach(showName => {
      this.showNameButtons[showName].addEventListener('click', this.setCurrentNameFilter);
    });
  };

  setCurrentNameFilter = event => {
    if (event.target.id === 'searchButton') {
      event.target.dataset.showName = this.viewElements.searchInput.value;
    };
    this.selectedName = event.target.dataset.showName;
    this.fetchAndDisplayShows();
  };

  fetchAndDisplayShows = () => {
    // Creating a DOMElement for each show from API's response, based on JSON fields.
    getShowsByKeyWord(this.selectedName).then(shows => this.renderCardsOnList(shows));
  };

  renderCardsOnList = shows => {
    Array.from(document.querySelectorAll('[data-show-id]')).forEach(btn => {
      btn.removeEventListener('click', this.openDetailsView);
    });
    this.viewElements.showsWrapper.innerHTML = "";

    for (const { show } of shows) {
      const card = this.createShowCard(show);
      this.viewElements.showsWrapper.appendChild(card);
    };
  };

  openDetailsView = event => {
    if (this.viewElements.showPreview.style.display !== 'block') {
      console.log(this.viewElements.showPreview.style.display)
      const { showId } = event.target.dataset;
      getShowById(showId).then(show => {
        const card = this.createShowCard(show, true);
        this.viewElements.showPreview.appendChild(card);
        this.viewElements.showPreview.style.display = 'block';
        console.log(this.viewElements.showPreview.style.display)
      });  
    } else {
      alert('First please hide opened window.');
    };
  };

  closeDetailsView = event => {
    // Getting actual displayed show's ID.
    const { showId } = event.target.dataset;
    // Setting displayed show's anchor button as close button and removing "close" event when details view is closing.
    const closeBtn = document.querySelector(`[id="showPreview"] [data-show-id="${showId}"]`);
    closeBtn.removeEventListener('click', this.closeDetailsView);
    this.viewElements.showPreview.style.display = 'none';
    this.viewElements.showPreview.innerHTML = '';
  };

  createShowCard = (show, isDetailed) => {
    // Creating a HTML element from response JSON data.
    const divCard = createDOMElement('div', 'card');
    const divCardBody = createDOMElement('div', 'card-body');
    const h5 = createDOMElement('h5', 'card-title', show.name);
    const btn = createDOMElement('a', 'btn btn-primary', 'Show details');
    let img, p;

    if (show.summary) {
      // I'm using here replace function to safe response data-summary from scripts or other invalid, wrong sources by removing HTML tags and special chars.
      if (isDetailed) {
        p = createDOMElement('p', 'card-text', String(show.summary).replace(/(<([^>]+)>)/ig, ''));
      } else {
        p = createDOMElement('p', 'card-text', `${String(show.summary).replace(/(<([^>]+)>)/ig, '').slice(0, 200)}...`);
      };
    } else {
      p = createDOMElement('p', 'card-text', 'There is no summary for that show yet.');
    };

    if (show.image) {
      if (isDetailed) {
        img = createDOMElement('div', 'card-preview-bg');
        console.log(show);
        img.style.backgroundImage = `url('${show.image.original}')`;
      } else {
        img = createDOMElement('img', 'card-img-top', null, show.image.medium);
      };
    } else {
      img = createDOMElement('img', 'card-img-top', null, 'https://via.placeholder.com/210x295/');
    };

    btn.dataset.showId = show.id;

    if (isDetailed) {
      btn.addEventListener('click', this.closeDetailsView);
      btn.innerText = 'Hide details';
    } else {
      btn.addEventListener('click', this.openDetailsView);
    };

    divCard.appendChild(img);
    divCard.appendChild(divCardBody);
    divCardBody.appendChild(h5);
    divCardBody.appendChild(p);
    divCardBody.appendChild(btn);

    return divCard;
  };
};

document.addEventListener('DOMContentLoaded', new TvMaze());
