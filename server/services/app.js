const apiClient = require('../utils/api-client');

exports.addMessengerIntegration = (apiToken, app, configuration) => {
  return apiClient.post(`/apps/${app}/integrations/messenger`, apiToken, configuration);
};

exports.addSlackIntegration = (apiToken, app, accessToken) => {
  return apiClient.post(`/apps/${app}/integrations/slack`, apiToken, {access_token: accessToken});
};
