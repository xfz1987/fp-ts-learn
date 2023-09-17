/*********************************/
// Either<E, A> => Either functor
//  Either functor has two value: Left and Right,
//  Left: the default value when Right does not exsit，
//  Right:  the normal value
// type Left<E> = { _tag: 'Left', left: E };
// type Right<A> = { _tag: 'Right', right: A};
// type Either<E, A> = Left<E> | Right<A>
/*********************************/
import { Either, tryCatch, fromNullable, fromPredicate } from 'fp-ts/Either';

function parse(s: string): Either<Error, unknown> {
	return tryCatch(
		() => JSON.parse(s),
		reason => new Error(String(reason))
	);
}

const success = '{"a": 1, "b": 2}';
const fail = '{"a": a, "b"}';

parse(success); // { _tag: 'Right', right: { a: 1, b: 2 } }
parse(fail); // { _tag: 'Left', left: Error:xxxxx

/******** fromNullable **********/
const getEitherString = fromNullable('defaultValue');
getEitherString(undefined); // { _tag: 'Left', left: 'defaultValue' }
getEitherString(null); // { _tag: 'Left', left: 'defaultValue' }
getEitherString('value'); // { _tag: 'Right', right: 'value' }

/******** fromPredicate **********/
const isEmptyString = (s: string) => s === '';
// fromPredicate(s => boolean, () => defaultValue); // if s => boolean is true, return s, otherwise, return defualtValue
const getEitherString2 = fromPredicate(
	(s: string) => !isEmptyString(s),
	() => 'defaultValue'
);
getEitherString2(''); // { _tag: 'Left', left: 'defaultValue' }
getEitherString2('abc'); // { _tag: 'Right', right: 'abc' }

export default () => {};
