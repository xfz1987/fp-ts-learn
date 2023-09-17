/*********************************/
// map
// declare const optionMap: <A, B>(f: (a:A) => B) => (fa: Option<A> => Option<B>);
// declare const taskMap: <A, B>(f: (a:A) => B) => (fa: Task<A> => Task<B>);
// declare const eitherMap: <A, B>(f: (a:A) => B) => <E>(fa: Either<E,A> => Either<E, B>);
// declare const taskEitherMap: <A, B>(f: (a:A) => B) => <E>(fa: TaskEither<E, A> => TaskEither<E, B>);
/*********************************/

import { fromNullable, map, fromPredicate } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/function';

pipe(
	'something value', // string
	fromNullable, // Option(<string>
	map(value => value.length), // Option<number> ==> { _tag: 'Some', value: 15 }
	map(value => value + 1), // Option<number> ==> { _tag: 'Some', value: 16 }
	map(value => value.toString) // Option<string> ==> { _tag: 'Some', value: '16' }
);

pipe(
	1, // number
	fromPredicate(value => value < 0), // Option<number> ==> { _tag: 'None' }
	map(value => value * value), // Option<number> ==> { _tag: 'None' }
	map(value => [value]) // Option<Array<number>> ==> { _tag: 'None' }
);

export default () => {};
