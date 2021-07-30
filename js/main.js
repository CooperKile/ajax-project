var $img = document.querySelector('img');
var $left = document.querySelector('.left');
var $right = document.querySelector('.right');
var $star = document.querySelector('.rate');
var $modal = document.querySelector('.overlay');
var $cancel = document.querySelector('.cancel');
var $rateRow = document.querySelector('.star-row');
var $rateStar = document.querySelectorAll('.modal-star');
var $submitRate = document.querySelector('.submit');
var $buttonRow = document.querySelector('.modal-button-row');
var picture = 0;

$right.addEventListener('click', nextImg);
$left.addEventListener('click', prevImg);
$star.addEventListener('click', openRate);
$buttonRow.addEventListener('click', closeRate);
$rateRow.addEventListener('click', rateStars);

function getImages() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://picsum.photos/v2/list');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    data.response = xhr.response;
  });
  xhr.send();
}
getImages();

function nextImg(event) {
  if (picture === data.response.length - 1) {
    picture = -1;
  }
  picture = picture + 1;
  $img.setAttribute('src', data.response[picture].download_url);
}
function prevImg(event) {
  if (picture === 0) {
    picture = data.response.length;
  }
  picture = picture - 1;
  $img.setAttribute('src', data.response[picture].download_url);
}

function openRate(event) {
  $modal.setAttribute('class', 'overlay');
}

function closeRate(string) {
  if (event.target === $cancel) {
    $modal.setAttribute('class', 'overlay hidden');
    data.currentPicture = null;
    data.currentRating = null;
  }
  if (event.target === $submitRate) {
    ratePhoto();
    $modal.setAttribute('class', 'overlay hidden');
    data.currentPicture = null;
    data.currentRating = null;
  }
  for (var i = 0; i < $rateStar.length; i++) {
    $rateStar[i].setAttribute('class', 'modal-star star far fa-star');
  }
}

function rateStars(event) {
  var rate = event.target.getAttribute('data-value');
  var rateToNumber = Number(rate);
  for (var i = 0; i < $rateStar.length; i++) {
    $rateStar[i].setAttribute('class', 'modal-star star far fa-star');
  }
  for (var j = 0; j <= rateToNumber; j++) {
    $rateStar[j].setAttribute('class', 'modal-star star fas fa-star');
  }
  data.currentRating = rate;
  data.currentPicture = picture;
}

function ratePhoto() {
  var newRating = {
    rating: data.currentRating,
    picture: data.currentPicture
  };
  data.ratings.push(newRating);
  newRating.rateId = data.nextRateId;
  data.nextRateId++;
}
