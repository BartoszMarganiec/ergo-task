import EventBus from '../domain/EventBus';
import EventBusTwo from '../domain/EventBus';

it('Check if singleton', () => {
  expect(EventBus).toEqual(EventBusTwo);
  expect(EventBus).toBe(EventBusTwo);
})

it('Check subscription & publish', () => {

  const callback = jest.fn();

  EventBus.subscribe('test', callback);

  EventBus.publish('test', 'data');

  expect(callback).toBeCalled();
});
