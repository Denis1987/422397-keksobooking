'use strict';


//массив описание жилья
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

//время заcеления
var checkins = [
  '12:00',
  '13:00',
  '14:00'
];

//всемя выезда выезда из жилья 
var checkouts = [
  '12:00',
  '13:00',
  '14:00'
];


//преимущества жилья
var features = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

//var types = {
//  'flat': 'квартира',
//  'house': 'дом',
//  'bungalo': 'бунгало'
//};


//переменные
var maxPrice = 100000;
var minPrice = 1000;
var maxGuests = 4;
var minGuests = 1;
var maxRooms = 4;
var minRooms = 1;
var maxTypes = 3;
var minTypes = 0;

//переменная для выдачи рандома
var getRandomNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max - min));
};

//массив аватарок
var avatars = [];

//цикл формирующий аватарку
for (var k = 1; k <= 8; k++) {
  avatars.push('img/avatars/user0' + k + '.png');
}

//переменная сумма пинов
var pinsAmount = 8;

var Template = document.querySelector('template');

var pinsContainer = document.querySelector('.map__pins');

var pins = [];
var showMap = document.querySelector('.map');
//showMap.classList.remove('map--faded');



//function formHide() {
//  document.querySelector('fieldset').disabled
//}
//добавляет атрибут блокирования для формы по тегу филдсет
var formHide = function () {
  document.querySelector('fieldset').disabled
}




//получаем случайную длину массивва
var getRandomElement = function (arr) {
  return arr[getRandomNumber(0, arr.length)];
};

//получаем случайный элемент массива
var getRandomElementNoRepeat = function (arr) {
  var index = getRandomNumber(0, arr.length);

  var item = arr[index];
  arr.splice(index, 1);
  return item;
};

var min = 0;

var getRandomSlice = function (arr) {

  var randomLeng = getRandomNumber(1, arr.length);
  var fullCopy = arr.slice();
  var result = [];
  for (var r = 0; r < randomLeng; r++) {
    result.push(getRandomElementNoRepeat(fullCopy));

  }
  return result;
};
//функция создающая массив с карточками
var createCards = function () {
  var mapCards = [];
  for (var i = 0; i < pinsAmount; i++) {
    var coordinates = {
      x: getRandomNumber(300, 900),
      y: getRandomNumber(100, 500)
    };
    var card = {
      "author": {
        "avatar": getRandomElementNoRepeat(avatars)
      },

      "offer": {
        "title": getRandomElement(title),
        "address": coordinates.x + ', ' + coordinates.y,
        "price": getRandomNumber(minPrice, maxPrice),
        "types": getRandomNumber(minTypes, maxTypes),
        "rooms": getRandomNumber(minRooms, maxRooms),
        "guests": getRandomNumber(minGuests, maxGuests),
        "checkins": getRandomElement(checkins),
        "checkouts": getRandomElement(checkouts),
        "features": getRandomSlice(features),
        "description": '',
        "photos": []
      },

      "location": {
        "x": coordinates.x,
        "y": coordinates.y
      }
    };
    mapCards.push(card);
  }
  return mapCards;
};

//дотягиваемся от дотягиваемся template к map__pin

var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');


//функция рисующая пины
var renderPins = function (mapPin) {
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.style.left = mapPin.location.x + 'px';
  pinElement.style.top = mapPin.location.y + 'px';
  pinElement.querySelector('img').src = mapPin.author.avatar;
  pinElement.addEventListener('click', onPinClick);
  return pinElement;
};
pins = renderPins;

var cards = createCards();

var fragmentPins = document.createDocumentFragment();

cards.forEach(function (item) {
  fragmentPins.appendChild(renderPins(item));
});

pinsContainer.appendChild(fragmentPins);

var carTemplate = Template.content.querySelector('.map__card');

//функция формирующая карточки
var renderCards = function (card) {
  var cardElement = carTemplate.cloneNode(true);

  cardElement.querySelector('h3').textContent = card.offer.title;
  cardElement.querySelector('small').textContent = card.offer.address;
  cardElement.querySelector('.popup__price').innerHTML = card.offer.price + ' &#x20bd;/ночь';
  cardElement.querySelector('h4').textContent = card.offer.type;
  cardElement.querySelector('h4 + p').textContent = card.offer.rooms + ' комнат для ' + card.offer.guests + ' гостей';
  cardElement.querySelector('.checkins').textContent = 'Заезд после ' + card.offer.checkins + ', выезд до ' + card.offer.checkouts;
  cardElement.querySelector('.popup__features').innerHTML = '';
  for (var f = 0; f < card.offer.features.length; f++) {
    cardElement.querySelector('.popup__features').innerHTML += '<li class="feature feature--' + card.offer.features[f] + '"></li>';
  }
  cardElement.querySelector('.popup__description').textContent = card.offer.description;
  cardElement.querySelector('.popup__avatar').src = card.author.avatar;

  return cardElement;
};

var fragmentCards = document.createDocumentFragment();

fragmentCards.appendChild(renderCards(getRandomElement(cards)));

showMap.appendChild(fragmentCards);


var tokioMap = document.querySelector('.map');

var mapPinMain = document.querySelector('.map__pin--main');
var noticeForm = document.querySelector('.notice__form');

var activateMap = function () {
  tokioMap.classList.remove('map--faded');

  noticeForm.classList.remove('notice__form--disabled');

  var fragmentPins = document.createDocumentFragment();

  cards.forEach(function (item) {
    fragmentPins.appendChild(renderPins(item));
  });
  pinsContainer.appendChild(fragmentPins);

  mapPinMain.removeEventListener('mouseup', activateMap);
};

mapPinMain.addEventListener('mouseup', activateMap);

pinTemplate.addEventListener('click') {
  if (pinTemplate 'focus') {
    pinTemplate.addEventListener('enter')
    pinTemplate.classList.add('map__pin--active')
  }
  pinTemplate.classList.add('map__pin--active')
  if (pinTemplate = ('.pin--active') {
      pinTemplate.classList.remove('pin--active')
    }
  }
}

var popupClose = document.querySelector('.popup__close');

popupClose.addEventListener('click') {
  if (popupClose 'focus') {
    popupClose.addEventListener('esc')
    pinTemplate.classList.remove('map__pin--active')
  }
  pinTemplate.classList.remove('map__pin--active')
}
