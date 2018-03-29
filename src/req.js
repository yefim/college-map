// libraries
import $ from 'jquery';

export default ({url, method, data}) => {
  let params = {dataType: 'json'};

  switch (method.toLowerCase()) {
    case 'patch':
    case 'post':
    case 'put':
      params.data = JSON.stringify(data);
      params.contentType = 'application/json';
      break;
    default:
      params.data = data;
      break;
  }

  return new Promise((resolve, reject) => {
    $.ajax({
      url,
      method,
      ...params
    }).done((res) => {
      resolve(res);
    }).fail((res) => {
      reject(res.responseJSON);
    });
  });
};
