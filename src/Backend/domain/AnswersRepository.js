const config = require('../config/config.js');
const axios = require('axios');

const mapResponseToAnswer = data => {
  return {
  id: data.answer_id,
  createDate: data.creation_date,
  body: data.body,
  isAccepted: data.is_accepted,
  author: data.owner.display_name
}}

const getQuestionAnswers = async (questionId, accessToken) => {

    let url = config.stackOverflow.api.url
      + '/questions/' + questionId + '/answers?order=desc&sort=activity&site=stackoverflow&filter=withbody';

      if(accessToken) {
        url += '&access_token=' + accessToken + '&key=' + config.stackOverflow.api.key;
      }

    try {
        const response = await axios.get(url);
        const data = response.data.items;
        const answers = data.map(item => mapResponseToAnswer(item));

        return answers;
    } catch(error) {
      console.log(error);
      throw Error('Error fetch data');
    }
}

const getAnswer = async (answerId, accessToken) => {
  let url = config.stackOverflow.api.url
    + '/answers/' + answerId + '?order=desc&sort=activity&site=stackoverflow&filter=withbody';

    if(accessToken) {
      url += '&access_token=' + accessToken + '&key=' + config.stackOverflow.api.key;
    }

  try {
      const response = await axios.get(url);
      const data = response.data.items[0];
      const answer = mapResponseToAnswer(data);

      return answer;
  } catch(error) {
    console.log(error);
    throw Error('Error fetch data');
  }
}

module.exports = {
  getQuestionAnswers: getQuestionAnswers,
  getAnswer: getAnswer
}
