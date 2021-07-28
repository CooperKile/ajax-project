var $img = document.querySelector('img');
// var $left = document.querySelector('.left');
var $right = document.querySelector('.right');
var xhr = new XMLHttpRequest();
var counter = 0;

$right.addEventListener('click', nextImg);
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
  counter++;
  $img.setAttribute('src', data.response[counter].download_url);
  //  console.log(counter);
  // if (data.response.length < counter) {
  //   counter = 1;
  // }
  // data.response[counter - 1].setAttribute('src', data.response[i].download_url);
}
