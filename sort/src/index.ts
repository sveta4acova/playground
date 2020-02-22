import { NumbersCollection } from './NumbersCollection';
import { Sorter } from './Sorter';
import { CharactersCollection } from './CharactersCollection';
import { LinkedList } from "./LinkedList";

const numbers = new NumbersCollection([1, 10, -2]);
numbers.sort();
// console.log(numbers.data);

const characters = new CharactersCollection('Xata');
characters.sort();
// console.log(characters.data);

const links = new LinkedList();
links.add(100);
links.add(-3);
links.add(10);
links.sort();
// links.print();
