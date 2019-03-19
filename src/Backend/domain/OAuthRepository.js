const config = require('../config/config.js');
const axios = require('axios');
const querystring = require('querystring');

const fetchAccessToken = async (code) => {

  const oauthConfig = config.stackOverflow.oAuth;

  const clientId = process.env.STACKOVERFLOW_CLIENT_ID;
  const clientSecret = process.env.STACKOVERFLOW_SECRET;

  const params = querystring.stringify({
    code: code,
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: oauthConfig.redirectUri
  });

  try {
      const response = await axios.post(oauthConfig.url, params);
      const accessToken = response.data.split('=')[1];

      return accessToken;
  } catch(error) {
    console.log(error);
  }


};

module.exports = {
  fetchAccessToken: fetchAccessToken
}
