import App from '../domain/App.js';
import ItemList from '../domain/ItemList';
import Searcher from '../domain/Searcher';
import EventBus from '../domain/EventBus';

it('Check if the class is correct', () => {
  const searcher = new Searcher();
  expect(searcher).toBeInstanceOf(Searcher);
  expect(searcher.searched).toEqual('');
  expect(searcher.getSearched()).toEqual('');
  expect(searcher.hasSearched()).toEqual(false);
});

it('Check after search', () => {
  const searcher = new Searcher();

  searcher.search({toSearch: 'php'});
  searcher.render = jest.fn();

  expect(searcher.searched).toEqual('php');
  expect(searcher.getSearched()).toEqual('php');
  expect(searcher.hasSearched()).toEqual(true);
});
