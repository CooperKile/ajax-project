var $img = document.querySelector('img');
var $left = document.querySelector('.left');
var $right = document.querySelector('.right');
var xhr = new XMLHttpRequest();
var picture = 0;

$right.addEventListener('click', nextImg);
$left.addEventListener('click', prevImg);
xhr.addEventListener('load', load);
xhr.open('GET', 'https://picsum.photos/v2/list');
xhr.responseType = 'json';
function load() {
  // console.log(xhr.status);
  // console.log(xhr.response);
  data.response = xhr.response;
}
xhr.send();

function nextImg(event) {
  if (picture === 29) {
    picture = -1;
  }
  picture = picture + 1;
  $img.setAttribute('src', data.response[picture].download_url);

}
function prevImg(event) {
  if (picture === 0) {
    picture = 30;
  }
  picture = picture - 1;
  $img.setAttribute('src', data.response[picture].download_url);

}
