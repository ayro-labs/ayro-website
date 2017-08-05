const apiClient = require('../utils/api-client');

exports.addSlackIntegration = (apiToken, app, accessToken) => {
  return apiClient.post(`/apps/${app}/integrations/slack`, apiToken, {access_token: accessToken});
};
