'use strict';

const settings = require('../configs/settings');
const apiClient = require('../utils/api-client');
const Promise = require('bluebird');

exports.getConfigs = () => {
  return Promise.resolve({
    appToken: settings.appToken,
    jsSdkVersion: settings.jsSdkVersion,
    jsSdkUrl: `https://cdn.ayro.io/sdks/ayro-${settings.jsSdkVersion}.min.js`,
    wpPluginVersion: settings.wpPluginVersion,
    wpPluginUrl: `/libs/ayro-wordpress-${settings.wpPluginVersion}.zip`,
    androidSdkVersion: settings.androidSdkVersion,
  });
};

exports.addMessengerIntegration = async (apiToken, app, configuration) => {
  return apiClient.post(`/apps/${app}/integrations/messenger`, apiToken, configuration);
};

exports.addSlackIntegration = async (apiToken, app, accessToken) => {
  return apiClient.post(`/apps/${app}/integrations/slack`, apiToken, {access_token: accessToken});
};
