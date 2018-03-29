import req from './req';

console.log('hello world');

$(document).ready(function() {
  console.log('ready');

  req({
    url: '/v1/users/me?fields=earnings',
    method: 'get'
  }).then((res) => {
    console.log(res);
  }).catch(() => {
    console.log('failed');
  });
});
