import config from '../config/config.js';
import Question from '../domain/Question';

const search = (value) => {

  let url = config.apiUrl + config.methods.search;

  let data = {
    search: value
  };

  let promise = fetch(url, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  });

  return promise
    .then(response => {

      if(response.status !== 200) {
        throw Error('Search data failed');
      }

      return response;
    })
    .then(response => response.json())
    .then(items => {
      return items.map(item => {
        return new Question(item.id, item.title, item.author, item.createDate, item.link, item.isAnswered, item.answerCount, item.hasAcceptedAnswer);
      })
    });

}

export default { search };
