/*********************************/
// Option<A>
// type None = { _tag: 'None' };
// type Some<A> = { _tag: 'Some', value: A};
// type Option<A> = None | Some<A>
/*********************************/

import { Option, some, none, fromNullable, fromPredicate } from 'fp-ts/Option';

function findIndex<A>(arr: Array<A>, predicate: (a: A) => boolean): Option<number> {
	const index = arr.findIndex(predicate);
	return index === -1 ? none : some(index);
}

const arr = [1, 2, 3];
findIndex(arr, n => n === 2); // { _tag: 'Some', value: 1 }
findIndex(arr, n => n === 4); // { _tag: 'None' }

/******** fromNullable **********/
fromNullable(undefined); // { _tag: 'None' }
fromNullable(null); // { _tag: 'None' }
fromNullable(0); // { _tag: 'Some', value: 0 }

/******** fromPredicate: assert **********/
const isNumber = <T>(a: T) => !isNaN(Number(a));
const getOptionNumber = fromPredicate(isNumber);
getOptionNumber('a'); // {_tag: 'None'}
getOptionNumber('10'); // { _tag: 'Some', value: '10' }
getOptionNumber(1); // { _tag: 'Some', value: 1 }

export default function () {}
