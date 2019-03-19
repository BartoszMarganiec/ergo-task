const config = require('../config/config.js');
const axios = require('axios');

const getDetails = async (id, accessToken) => {

    let url = config.stackOverflow.api.url
      + '/questions/' + id + '?order=desc&sort=activity&site=stackoverflow&filter=withbody';

      if(accessToken) {
        url += '&access_token=' + accessToken + '&key=' + config.stackOverflow.api.key;
      }

    try {
        const response = await axios.get(url);
        const data = response.data.items[0];

        return {
          id: data.question_id,
          body: data.body,
          answerCount: data.answer_count,
          acceptedAnswer: data.accepted_answer_id
        }
    } catch(error) {
      console.log(error);
      throw Error('Error fetch data');
    }
}

const search = async (value, accessToken) => {

  let url = config.stackOverflow.api.url
    + '/search?order=desc&sort=activity&site=stackoverflow&intitle=' + value;

    if(accessToken) {
      url += '&access_token=' + accessToken + '&key=' + config.stackOverflow.api.key;
    }

  try {
      const response = await axios.get(url);

      const mapped = response.data.items.map(entry => {
        return {
          id: entry.question_id,
          title: entry.title,
          link: entry.link,
          createDate: entry.creation_date,
          isAnswered: entry.is_answered,
          answerCount: entry.answer_count,
          hasAcceptedAnswer: entry.accepted_answer_id ? true : false,
          author: entry.owner.display_name
        }
      })

      return mapped;
  } catch(error) {
    console.log(error);
    throw Error('Error search data');
  }
}

module.exports = {
  getDetails: getDetails,
  search: search
}
