import req from './req';

console.log('hello world');

req({url: '/v1/users/me?fields=followedCollegeIds', method: 'get'}).then(function({followedCollegeIds}) {
  followedCollegeIds.forEach(function(collegeId) {
    req({url: `/v1/colleges/${collegeId}?fields=amount,loc,name,logo`, method: 'get'}).then(function(college) {
      console.log(college);
    });
  });
});

window.initMap = function() {
  var uluru = {lat: -25.363, lng: 131.044};

  var map = new google.maps.Map(document.getElementById('college-map'), {
    zoom: 4,
    center: uluru
  });

  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
};
