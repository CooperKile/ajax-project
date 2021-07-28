var $img = document.querySelector('img');
var $left = document.querySelector('.left');
var $right = document.querySelector('.right');
var $star = document.querySelector('.rate');
var $modal = document.querySelector('.overlay');
var $cancel = document.querySelector('.cancel');
var picture = 0;

$right.addEventListener('click', nextImg);
$left.addEventListener('click', prevImg);
$star.addEventListener('click', openRate);
$modal.addEventListener('click', rateModal);

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

function rateModal(event) {
  if (event.target === $cancel) {
    $modal.setAttribute('class', 'hidden');
  }
}
