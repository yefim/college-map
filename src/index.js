import './styles.css'

import req from './req';

let beginDrop = false;
let needToDrop = [];

$(document).ready(function() {
  $('.modal button').on('click', function() {
    $('.modal').remove();
    $('.overlay').remove();
    beginDrop = true;
    if (window.map) {
      needToDrop.forEach(function(marker) {
        marker.setMap(map);
      });
    }
  });
});

window.initMap = function() {
  const center = {
    lat: 39.5,
    lng: -98.35
  };

  window.map = new google.maps.Map(document.getElementById('college-map'), {
    zoom: 5,
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

        const infoWindow = new google.maps.InfoWindow({
          content: contentString
        });

        infoWindows.push(infoWindow);

        const marker = new google.maps.Marker({
          position: {lat: college.loc[1], lng: college.loc[0]},
          title: college.name,
          animation: google.maps.Animation.DROP
        });

        marker.addListener('click', function() {
          infoWindows.forEach(function(i) {
            i.close();
          });

          infoWindow.open(map, marker);
        });

        if (beginDrop) {
          marker.setMap(map);
        } else {
          needToDrop.push(marker);
        }
      });
    });
  });
};
