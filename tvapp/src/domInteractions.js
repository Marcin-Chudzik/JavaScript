const _getDomElement = (attribute, value) => {
    return document.querySelector(`[${attribute}="${value}"]`);
  };
  
  
  export const mapListToDOMElements = (listOfValues, attribute) => {
    const _viewElements = {};
  
    for (const value of listOfValues) {
      _viewElements[value] = _getDomElement(attribute, value);
    };
  
    return _viewElements;
  };
  