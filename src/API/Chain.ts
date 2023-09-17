/*********************************/
// chain in Either
// declare const chain: <E, A, B>(f: (a: A) => Either<E, B>) => (ma: Either<E, A>) => Either<E, B>
/*********************************/
import { Either, chain, left, right } from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';

const multiplyByTen = <T>(value: T): Either<string, number> =>
	typeof value === 'number' ? right(value * 10) : left('not a number');

const increment = (value: number): Either<string, number> => right(value + 1);

const func = <T>(value: T) => pipe(value, multiplyByTen, chain(increment));

func(1); // { _tag: 'Right', right: 11 }
func('hello'); // { _tag: 'Left', left: 'not a number' }

export default () => {};
