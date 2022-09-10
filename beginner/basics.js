// String's methods
let name = "marcin";
name.indexOf("a");
console.log(name[0]);
let nameCapitalized = name[0].toUpperCase() + name.slice(1, name.length);

// Number's methods
let x = 10;
let y = 5;
console.log(x + y);
console.log(x - y);
console.log(x / y);
console.log(x * y);
console.log(x % y);
console.log(x ** y);

// Array's methods
let dogs = ["Rex", "Ares", "Tommy"];
console.log(dogs[0]);
console.log(dogs.indexOf("Ares"));
dogs.push("Max");
dogs.forEach((dog) => { console.log(dog) })
dogs.pop();

let dogs2 = dogs.map((dog) => {
  return dog.toUpperCase()});

let dogs3 = dogs.filter((dog) => {
  if (dog.length > 3 ) return true;
})

// Objects
let person = {
  name: "Marcin",
  lastName: "Chudzik",
  age: 21,
  isSingle: false
}

// Object's methods
person.children = ["Jarek", "Szymon"];

Object.keys(person)

Object.keys(person).forEach(key => {
  console.log(`${key}: ${person[key]}`);
})

// Functions
function prepareTea(teaType) {
  return `I prepared ${teaTypeFormatted} tea.`;
}

function multiply(n1, n2) {
  return n1 * n2;
}

// Arrow functions
let prepareTea2 = (teaType) => { return `I prepared ${teaTypeFormatted} tea.`};

// For loop
for (let element of a) {
  console.log(`Element ${element}`)
}

// If condition
function divide(n1, n2) {
  if (n1 !== 0 && n2 !== 0) {
    return n1 / n2;
  } else {
    return false;
  }
}

function validateText(text) {
  if (!text) return false;
  if (text.length < 3) return false;
  if (text[0] === "A") return true;
  else return false;
}

function checkIfDofExists(dogName) {
  let dogs = ["Rex", "Ares", "Tommy"];
  
  return dogs.filter((dog) => dog.toUpperCase() === dogName.toUpperCase()).length > 0;
}

// Switch case condition
let name = "Marcin";

switch (name) {
  case "Marcin" :
    console.log("It's me!");
    break;
  case "Ania" :
    console.log("It's she!");
    break;
  case "Bartek" :
    console.log("It's he!");
    break;
  default : console.log("Default!")
}