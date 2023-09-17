/***********************/
// match
// declare const optionNatch: <A, B>(onNone: () => B, onSome: (a: A) => B) => (ma: Option<A>) => B
// declare const eitherNatch: <E, A, B>(onNone: (e: E) => B, onSome: (a: A) => B) => (ma: Either<E, A>) => B
/***********************/
import { fromPredicate, match } from 'fp-ts/Option';
import { pipe } from 'fp-ts/function';

pipe(
	2, // 0
	fromPredicate(value => value !== 0), // Option<number> ==> { _tag: 'Some', value: 2 }
	match(
		() => 0, // onNone
		value => 10 / value // onSome
	)
); // 5

// if the first parmeter is 0, the final result is 0

export default () => {};
