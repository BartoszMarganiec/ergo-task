const soService = require('./domain/StackOverflowService.js');
const oAuthRepository = require('./domain/OAuthRepository.js');
const fs = require('fs');
const index = fs.readFileSync('dist/index.html');

const serveIndex = (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(index);
};

const getDetailsAction = (req, res) => {
  const accessToken = req.session.accessToken;
  const detailsPromise = soService.getDetails(req.query.id, accessToken);

  detailsPromise.then(details => {
    res.end(JSON.stringify(details));
  }).catch(error => {
    res.writeHead(500);
    res.end(JSON.stringify({msg: error.message}));
  });

};

const searchAction = (req, res) => {
  const accessToken = req.session.accessToken;
  const resultPromise = soService.search(req.body.search, accessToken);

  resultPromise.then(result => {
    res.end(JSON.stringify(result));
  }).catch(error => {
    res.writeHead(500);
    res.end(JSON.stringify({msg: error.message}));
  });

};

const authAction = (req, res) => {

  const code = req.query.code;

  oAuthRepository.fetchAccessToken(code).then(accessToken => {

    req.session.accessToken = accessToken;
    req.session.logged = 1;

    res.cookie('logged', 1, {maxAge: 60000});
    res.redirect('/');
  });

};

const logoutAction = (req, res, next) => {
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      if(err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
};

module.exports = {
  searchAction: searchAction,
  serveIndex: serveIndex,
  authAction: authAction,
  getDetailsAction: getDetailsAction,
  logoutAction: logoutAction
}
