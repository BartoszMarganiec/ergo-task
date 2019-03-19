import App from '../domain/App.js';
import ItemList from '../domain/ItemList';
import Searcher from '../domain/Searcher';

it('Check if the app is correct', () => {
  const app = new App();
  expect(app.inited).toEqual(false);
});

it('Check if the app inited correctly', () => {
  const app = new App();
  app.init();
  expect(app.inited).toEqual(true);
  expect(app.items).toBeInstanceOf(ItemList);
  expect(app.searcher).toBeInstanceOf(Searcher);
});
