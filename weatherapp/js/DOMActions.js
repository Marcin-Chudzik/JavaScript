const _getDomElement = id => {
  return document.getElementById(id);
};


export const mapListToDOMElements = listOfId => {
  const _viewElements = {};

  for (const id of listOfId) {
    _viewElements[id] = _getDomElement(id);
  };

  return _viewElements;
};
