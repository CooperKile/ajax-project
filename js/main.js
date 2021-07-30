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
var $reviewButton = document.querySelector('.review');
var $reviewModal = document.querySelector('.overlay-review');
var $reviewButtonRow = document.querySelector('.review-button-row');
var $reviewCancel = document.querySelector('.review-cancel');
var title = document.querySelector('.title-area');
var text = document.querySelector('.review-area');
var $reviewForm = document.getElementById('review-form');
var picture = 0;

$right.addEventListener('click', nextImg);
$left.addEventListener('click', prevImg);
$star.addEventListener('click', openRate);
$buttonRow.addEventListener('click', closeRate);
$reviewButtonRow.addEventListener('click', closeReview);
$rateRow.addEventListener('click', rateStars);
$reviewButton.addEventListener('click', openReview);
$reviewForm.addEventListener('submit', reviewPhoto);

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

function openReview(event) {
  $reviewModal.setAttribute('class', 'overlay');
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

function closeReview(string) {
  if (event.target === $reviewCancel) {
    $reviewModal.setAttribute('class', 'overlay hidden');
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

function reviewPhoto(event) {
  event.preventDefault();
  var newReview = {
    title: title.value,
    review: text.value,
    picture: picture
  };
  newReview.reviewId = data.nextReviewId;
  data.nextReviewId++;
  data.reviews.push(newReview);
  $reviewForm.reset($reviewForm);
  $reviewModal.setAttribute('class', 'overlay hidden');
}
