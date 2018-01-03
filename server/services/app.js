const settings = require('../configs/settings');
const apiClient = require('../utils/api-client');
const Promise = require('bluebird');

exports.getConfigs = () => {
  return Promise.resolve({
    appToken: settings.appToken,
    jsSdkVersion: settings.jsSdkVersion,
    jsSdkUrl: `${settings.websiteUrl}/libs/ayro-${settings.jsSdkVersion}.min.js`,
    androidSdkVersion: settings.androidSdkVersion,
  });
};

exports.addMessengerIntegration = (apiToken, app, configuration) => {
  return apiClient.post(`/apps/${app}/integrations/messenger`, apiToken, configuration);
};

exports.addSlackIntegration = (apiToken, app, accessToken) => {
  return apiClient.post(`/apps/${app}/integrations/slack`, apiToken, {access_token: accessToken});
};
