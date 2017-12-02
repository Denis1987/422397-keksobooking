'use strict';

var title = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var checkins = [
  '12:00',
  '13:00',
  '14:00'
];

var checkouts = [
  '12:00',
  '13:00',
  '14:00'
];

var features = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var types = [
  'flat',
  'house',
  'bungalo'
];

var maxPrice = 100000;
var minPrice = 1000;
var maxGuests = 4;
var minGuests = 1;
var maxRooms = 4;
var minRooms = 1;
var maxTypes = 3;
var minTypes = 0;
var getRandomNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max - min));
};
var avatars = [];
for (var k = 1; k <= 8; k++) {
  avatars.push('img/avatars/user0' + getRandomNumber(1, 8) + '.png');
}

var pinsAmount = 8;

var Template = document.querySelector('template');

var pinsContainer = document.querySelector('.map__pins');

//это и есть наш массив

var pins = [];

var showMap = document.querySelector('.map');
showMap.classList.remove('map--faded');


var getRandomElement = function (arr) {
  return arr[getRandomNumber(0, arr.length)];
}


var getRandomElementNoRepeat = function (arr) {
  var index = getRandomNumber(0, arr.length);

  var item = arr[index];
  arr.splice(index, 1);
  return item;
}



var min = 0;

var getRandomSlice = function (arr) {
  var min = 0;
  var max = arr.length;
  var randomLeng = Math.round(min - 0.5 + Math.random() * (max - min + 1));
  return arr.slice(min, randomLeng);
}
var result = getFeatures;





var createCards = function () {
  var mapCards = [];
  for (var i = 0; i < pinsAmount; i++) {
    var coordinates = {
      x: getRandomNumber(300, 900),
      y: getRandomNumber(100, 500)
    }
    var card = {
      "author": {
        "avatar": getRandomElementNoRepeat(avatars)
      },

      "offer": {
        "title": getRandomElement(title),
        "address": coordinates.x + ", " + coordinates.y,
        "price": getRandomNumber(minPrice, maxPrice),
        "types": getRandomNumber(minTypes, maxTypes),
        "rooms": getRandomNumber(minRooms, maxRooms),
        "guests": getRandomNumber(minGuests, maxGuests),
        "checkins": getRandomElement(checkins),
        "checkouts": getRandomElement(checkouts),
        "features": features,
        "description": '',
        "photos": []
      },

      "location": {
        "x": coordinates.x,
        "y": coordinates.y
      }
    }
    mapCards.push(card);
  }
  return mapCards;
};


//до этого места более-меннее осознано сделал а вот потом копировал и пробовал разобраться и выловить ошибки

//вот я нашел в дом дереве шаблон
var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');

//здесь клонируется пин
var renderPins = function (mapPin) {
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.style.left = mapPin.location.x + 'px';
  pinElement.style.top = mapPin.location.y + 'px';
  pinElement.querySelector('img').src = mapPin.author.avatar;

  return pinElement;
};
pins = renderPins;
//console.log(pinTemplate);
var cards = createCards();


var fragmentPins = document.createDocumentFragment();

cards.forEach(function (item) {
  fragmentPins.appendChild(renderPins(item));
});


pinsContainer.appendChild(fragmentPins);

var carTemplate = Template.content.querySelector('.map__card');


var renderCards = function (card) {
  var cardElement = carTemplate.cloneNode(true);

  cardElement.querySelector('h3').textContent = card.offer.title;
  cardElement.querySelector('small').textContent = card.offer.address;
  cardElement.querySelector('.popup__price').innerHTML = card.offer.price + ' &#x20bd;/ночь';
  cardElement.querySelector('h4').textContent = card.offer.type;
  cardElement.querySelector('h4 + p').textContent = card.offer.rooms + ' комнат для ' + card.offer.guests + ' гостей';
  cardElement.querySelector('.checkins').textContent = 'Заезд после ' + card.offer.checkins + ', выезд до ' + card.offer.checkouts;
  cardElement.querySelector('.popup__features').innerHTML = '';
  cardElement.querySelector('.popup__features').insertAdjacentHTML('afterbegin', card.offer.features.map(getFeatures).join(' '));
  cardElement.querySelector('.popup__description').textContent = card.offer.description;
  cardElement.querySelector('.popup__avatar').src = card.author.avatar;

  return cardElement;
};

var fragmentCards = document.createDocumentFragment();

fragmentCards.appendChild(renderCards(getRandomElement(cards)));

showMap.appendChild(fragmentCards);
