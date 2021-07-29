/* exported data */
var data = {
  response: null,
  ratings: [],
  reviews: [],
  nextRateId: 1
};

window.addEventListener('beforeunload', storeData);
function storeData(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('data', dataJSON);
}

var previousEntryJSON = localStorage.getItem('data');
if (previousEntryJSON !== null) {
  data = (JSON.parse(previousEntryJSON));
}
