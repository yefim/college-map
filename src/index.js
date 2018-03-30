import req from './req';

window.initMap = function() {
  const center = {
    lat: 39.5,
    lng: -98.35
  };

  const map = new google.maps.Map(document.getElementById('college-map'), {
    zoom: 4,
    center: center
  });

  const infoWindows = [];

  req({url: '/v1/users/me?fields=followedCollegeIds', method: 'get'}).then(function({followedCollegeIds}) {
    followedCollegeIds.forEach(function(collegeId) {
      req({url: `/v1/colleges/${collegeId}?fields=amount,loc,name,logo`, method: 'get'}).then(function(college) {
        const contentString = [
          '<div style="display: flex; flex-direction: column; align-items: center;">',
          `<p style="font-size: 20px; font-weight: 400;">${college.name}</p>`,
          `<img height="60" width=60" src="${college.logo}" />`,
          college.amount ? `<p style="font-size: 16px;">You're earning $${college.amount}.</p>` : '',
          '</div>'
        ].join('');

        console.log(contentString);

        const infoWindow = new google.maps.InfoWindow({
          content: contentString
        });

        infoWindows.push(infoWindow);

        const marker = new google.maps.Marker({
          position: {lat: college.loc[1], lng: college.loc[0]},
          map: map
        });

        marker.addListener('click', function() {
          infoWindows.forEach(function(i) {
            i.close();
          });

          infoWindow.open(map, marker);
        });
      });
    });
  });
};
