import req from './req';

console.log('hello world');

req({url: '/v1/users/me?fields=earnings', method: 'get'}).then(function(user) {
  user.earnings.forEach(function(earning) {
    console.log(earning.collegeId);
  });
});
