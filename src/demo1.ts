import * as O from 'fp-ts/Option';
import { Task } from 'fp-ts/Task';

import * as A from 'fp-ts/lib/Array';
import { isString } from 'fp-ts/lib/string';
import { pipe } from 'fp-ts/lib/function';

function safeHead<T>(arr: T[]): O.Option<T> {
	return arr.length === 0 ? O.none : O.some(arr[0]);
}

// Homogenous
const foo = [1, 2, 3]; // number[]

// Non Homogenous
const bar = [1, '2', 3]; // (string | number)[]

type Foo = {
	_tag: 'Foo';
	f: () => number;
};

type Bar = {
	_tag: 'Bar';
	g: () => number;
};

declare const arr: Array<Foo | Bar>;
for (const a of arr) {
	console.log(a._tag); // Ok
	console.log(a.f()); // Error: not assignable to Bar
	console.log(a.g()); // Error: not assignable to Foo
}

const demo1 = 'demo1';
export default demo1;
