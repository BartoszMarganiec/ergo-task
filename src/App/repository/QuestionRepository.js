import config from '../config/config.js';
import Question from '../domain/Question';


const getDetails = (id) => {
  let url = config.apiUrl + config.methods.getDetails + '?id=' +id;

  let promise = fetch(url);

  return promise.then(response => {
    if(response.status !== 200) {
      throw Error('Fetch data failed');
    }

    return response;
  }).then(response => response.json());
}

export default { getDetails };
