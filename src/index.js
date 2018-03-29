import req from './req';

window.initMap = function() {
  var center = {
    lat: 39.5,
    lng: -98.35
  };

  var map = new google.maps.Map(document.getElementById('college-map'), {
    zoom: 4,
    center: center
  });

  var markers = [];

  markers.push(new google.maps.Marker({
    position: center,
    map: map
  }));

  req({url: '/v1/users/me?fields=followedCollegeIds', method: 'get'}).then(function({followedCollegeIds}) {
    followedCollegeIds.forEach(function(collegeId) {
      req({url: `/v1/colleges/${collegeId}?fields=amount,loc,name,logo`, method: 'get'}).then(function(college) {
        var college = {
          lat: college.loc[1],
          lng: college.loc[0]
        };

        markers.push(new google.maps.Marker({
          position: college,
          map: map
        }));
      });
    });
  });
};
