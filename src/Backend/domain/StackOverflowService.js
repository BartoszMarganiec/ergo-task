const questionsRepository = require('./QuestionsRepository.js');
const answersRepository = require('./AnswersRepository.js');

const search = (value, accessToken) => {
    return questionsRepository.search(value, accessToken);
}

const getDetails = (id, accessToken) => {
  const promise = questionsRepository.getDetails(id, accessToken);

  return promise.then(details => getAnswers(details, accessToken));
}

const getAnswers = async (details, accessToken) => {

  details.answers = [];

  if(typeof details.acceptedAnswer === 'number') {
    const answer = await answersRepository.getAnswer(details.acceptedAnswer, accessToken);
    details.answers = [answer];
  } else if(details.answerCount > 0) {
    const answers = await answersRepository.getQuestionAnswers(details.id, accessToken);
    details.answers = answers;
  }

  return details;
}

module.exports = {
  search: search,
  getDetails: getDetails
}
