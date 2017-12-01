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

var checkin = [
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

var cards = [];

var pinsAmount = 8;

var Template = document.querySelector('template');

var pins = document.querySelector('.map__pins');

var coordinates = {
  x: getRandomNumber(300, 600),
  y: getRandomNumber(150, 350)
}
//это и есть наш массив

var pins = [];

var showMap = document.querySelector('.map');
showMap.classList.remove('map--faded');

var getRandomNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max - min));
};


var createCards = function () {
  for (var i = 0; i < pinsAmount; i++) {
    var card = {
      "author": {
        "avatar": 'img/avatars/user' + getRandomNumber(0, 8) + '.png'
      },

      "offer": {
        "title": getRandomNumber(0, 8),
        "address": coordinates.x + ", " + coordinates.y,
        "price": getRandomNumber(1000, 100000),
        "types": getRandomNumber(0, 3),
        "rooms": getRandomNumber(1, 4),
        "quests": getRandomNumber(1, 4),
        "checkins": getRandomNumber(1, 3),
        "checkouts": getRandomNumber(1, 3),
        "features": features,
        "description": '',
        "photos": []
      },

      "location": {
        "x": coordinates.x,
        "y": coordinates.y
      }
    }
    pins.push(card);
  }
  return cards;
};
console.log(offer.card);

//до этого места более-меннее осознано сделал а вот потом копировал и пробовал разобраться и выловить ошибки

//вот я нашел в дом дереве шаблон
var pinTemplate = document.querySelector('template').content;

//здесь клонируется пин
var renderPins = function (mapPin) {
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.style.left = mapPin.coordinates.x + 'px';
  pinElement.style.top = mapPin.coordinates.y + 'px';
  pinElement.querySelector('img').src = mapPin.author.avatar;

  return pinElement;
};
pins = renderPins;
//console.log(pinTemplate);
cards = createCards();


var fragmentPins = document.createDocumentFragment();

cards.forEach(function (item) {
  fragmentPins.appendChild(renderMapPins(item));
});


pins.appendChild(fragmentPins);

var Template = commonTemplate.content.querySelector('.map__card');


var renderCards = function (card) {
  var cardElement = Template.cloneNode(true);

  cardElement.querySelector('h3').textContent = card.offer.title;
  cardElement.querySelector('small').textContent = card.offer.address;
  cardElement.querySelector('.popup__price').innerHTML = card.offer.price + ' &#x20bd;/ночь';
  cardElement.querySelector('h4').textContent = card.offer.type;
  cardElement.querySelector('h4 + p').textContent = card.offer.rooms + ' комнат для ' + card.offer.guests + ' гостей';
  cardElement.querySelector('.checkins').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
  cardElement.querySelector('.popup__features').innerHTML = '';
  cardElement.querySelector('.popup__features').insertAdjacentHTML('afterbegin', card.offer.features.map(getFeatures).join(' '));
  cardElement.querySelector('.popup__description').textContent = card.offer.description;
  cardElement.querySelector('.popup__avatar').src = card.author.avatar;

  return cardElement;
};

var fragmentCards = document.createDocumentFragment();

fragmentCards.appendChild(renderCards(cards[getRandomNumber(0, 8)]));

showMap.appendChild(fragmentCards);
