const settings = require('../configs/settings');
const errors = require('../utils/errors');
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

exports.get = async (path, apiToken) => {
  try {
    const response = await apiClient.get(path, getOptions(apiToken));
    return response.data;
  } catch (err) {
    throw errors.fromResponseError(err);
  }
};

exports.post = async (path, apiToken, body) => {
  try {
    const response = await apiClient.post(path, body, getOptions(apiToken));
    return response.data;
  } catch (err) {
    throw errors.fromResponseError(err);
  }
};

exports.delete = async (path, apiToken) => {
  try {
    const response = await apiClient.delete(path, getOptions(apiToken));
    return response.data;
  } catch (err) {
    throw errors.fromResponseError(err);
  }
};
