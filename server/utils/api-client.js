const settings = require('../configs/settings');
const axios = require('axios');

const apiClient = axios.create({
  baseURL: settings.apiUrl,
});

function getOptions(apiToken) {
  return {
    headers: {
      'X-Token': apiToken,
    },
  };
}

exports.get = (path, apiToken) => {
  return apiClient.get(path, getOptions(apiToken)).then(response => response.data);
};

exports.post = (path, apiToken, body) => {
  return apiClient.post(path, body, getOptions(apiToken)).then(response => response.data);
};

exports.delete = (path, apiToken) => {
  return apiClient.delete(path, getOptions(apiToken)).then(response => response.data);
};
