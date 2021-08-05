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
var $profile = document.querySelector('.user');
var $mainView = document.querySelector('.main-icon');
var $dataView = document.querySelectorAll('div[data-view]');
var $dropdown = document.querySelector('.dropdown');
var renderReview = document.querySelector('.review-row');
var renderRating = document.querySelector('.rating-row');
var picture = 0;

$right.addEventListener('click', nextImg);
$left.addEventListener('click', prevImg);
$star.addEventListener('click', openRate);
$buttonRow.addEventListener('click', closeRate);
$reviewButtonRow.addEventListener('click', closeReview);
$rateRow.addEventListener('click', rateStars);
$reviewButton.addEventListener('click', openReview);
$reviewForm.addEventListener('submit', reviewPhoto);
$profile.addEventListener('click', handleViewSwitch);
$mainView.addEventListener('click', handleViewSwitch);
$dropdown.addEventListener('change', profileView);
window.addEventListener('DOMContentLoaded', appendReviewEntry);
window.addEventListener('DOMContentLoaded', appendRatingEntry);

function handleViewSwitch(event) {
  var viewName = event.target.getAttribute('data-view');
  switchViews(viewName);
}

function switchViews(string) {
  for (var i = 0; i < $dataView.length; i++) {
    if ($dataView[i].getAttribute('data-view') !== string) {
      $dataView[i].classList.add('hidden');
    } else {
      $dataView[i].classList.remove('hidden');
      data.view = string;
    }
  }
}
switchViews(data.view);

function profileView(event) {
  var ratings = document.querySelector('.ratings');
  var reviews = document.querySelector('.reviews');
  var noReviews = document.querySelector('.no-reviews');
  var noRatings = document.querySelector('.no-ratings');
  if (event.target.value === 'reviews') {
    if (data.reviews.length > 0) {
      noReviews.setAttribute('class', 'no-reviews hidden');
    }
    reviews.setAttribute('class', 'reviews');
    ratings.setAttribute('class', 'ratings hidden');
  } else if (event.target.value === 'ratings') {
    if (data.ratings.length > 0) {
      noRatings.setAttribute('class', 'no-ratings hidden');
    }
    ratings.setAttribute('class', 'ratings');
    reviews.setAttribute('class', 'reviews hidden');
  }
}

function renderReviews(review) {
  // debugger;
  var li = document.createElement('li');
  li.setAttribute('class', 'review-display');
  var img = document.createElement('img');
  img.setAttribute('class', 'reviewImg');
  img.setAttribute('src', data.response[review.picture].download_url);
  li.appendChild(img);
  var title = document.createElement('h2');
  title.setAttribute('class', 'render-title');
  var titleText = document.createTextNode(review.title);
  title.appendChild(titleText);
  li.appendChild(title);
  var reviews = document.createElement('h3');
  reviews.setAttribute('class', 'render-text');
  var reviewText = document.createTextNode(review.reviewText);
  reviews.appendChild(reviewText);
  li.appendChild(reviews);
  return li;
}

function renderRatings(rating) {
  var li = document.createElement('li');
  li.setAttribute('class', 'rating');
  var img = document.createElement('img');
  img.setAttribute('class', 'ratingImg');
  img.setAttribute('src', data.response[rating.ratePicture].download_url);
  li.appendChild(img);
  // var ratingParse = JSON.parse(rating.rating);
  // console.log(ratingParse);
  // var numberOfStars = ratingParse;
  return li;
}

function appendReviewEntry(event) {
  for (var i = data.reviews.length - 1; i >= 0; i--) {
    renderReview.appendChild(renderReviews(data.reviews[i]));
  }
}

function appendRatingEntry(event) {
  for (var j = data.ratings.length - 1; j >= 0; j--) {
    renderRating.appendChild(renderRatings(data.reviews[j]));
  }
}

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
    ratingValue: data.currentRating,
    ratePicture: data.currentPicture
  };
  data.ratings.push(newRating);
  newRating.rateId = data.nextRateId;
  data.nextRateId++;
}

function reviewPhoto(event) {
  event.preventDefault();
  var newReview = {
    title: title.value,
    reviewText: text.value,
    picture: picture
  };
  newReview.reviewId = data.nextReviewId;
  data.nextReviewId++;
  data.reviews.push(newReview);
  $reviewForm.reset($reviewForm);
  $reviewModal.setAttribute('class', 'overlay hidden');
}
