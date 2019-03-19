var assert = require('assert');
describe('EventBus', function() {

  it('should get EventBus instance', function() {

    var eventBus = require('../src/App/domain/EventBus');

    //console.log(eventBus);
    assert(typeof eventBus === 'EventBus');

  });
});
