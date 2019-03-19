import ItemList from '../domain/ItemList';
import Question from '../domain/Question';

it('Check if the new class is correct', () => {
  const itemList = new ItemList;

  expect(itemList.questions).toEqual([]);
  expect(itemList.itemDetails).toEqual([]);
  expect(itemList.isEmpty()).toEqual(true);
});


it('Check load question', () => {
  const itemList = new ItemList;
  const question = new Question(1, 'Test', 'BM', (new Date()).getTime(), 'link', false, 0, false);
  const data = [question];

  itemList.load(data);
  expect(itemList.questions).toEqual(data);

  let notArray = () => {
    itemList.load(1);
  }

  expect(notArray).toThrow('This is not array');

  let wrongObject = () => {
    itemList.load([question, 2]);
  }

  expect(wrongObject).toThrow('Array should contains only Question objects');
});


it('Check selecting item', () => {
  const itemList = new ItemList;




})
