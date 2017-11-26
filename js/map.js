'use strict';


var pins = {
  author: 'avatar',
  offer: 'title',
  location: [x, y]
};

var avatar = 'img/avatars/user{{01, 02, 03, 04, 05, 06, 07, 08}}.png';
var title = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var address = '{{location.x}}, {{location.y}}';
var price = Math.random(1000 - 1  000  000);
var type = ['flat, house, bungalo'];
var rooms = Math.random(1 - 5);
var guests = Math.random(Infinity);
var checkin = ['12:00', '13:00', '14:00'];
var checkout = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner',
                'description', ''];
var photos = [];
var location = Math.random(300 - 900),
  Math.random(100 - 500);

console.log(pins);
