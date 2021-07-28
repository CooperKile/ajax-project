var $img = document.querySelector('img');
var $left = document.querySelector('.left');
var $right = document.querySelector('.right');
var $star = document.querySelector('.rate');
var picture = 0;

$right.addEventListener('click', nextImg);
$left.addEventListener('click', prevImg);
$star.addEventListener('click', rateImg);

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

function rateImg(event) {
  // console.log('this was reached');
}
