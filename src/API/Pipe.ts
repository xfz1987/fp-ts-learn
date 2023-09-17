// pipe
// 1 --- add1 ---> 2 ---- add2 ---> 4 --- add3 ---> 7
// const add = (a: number) => (b: number) => a + b;
// const add1 = add(1);
// const add2 = add(2);
// const add3 = add(3);
// add3(add2(add1(1))); // 7

// pipe(param, func1, [...func]) ===> func2(func1(1))
// param as the parameter of func1, func1(1) as the paramter of func2, and so on ...
import { pipe } from 'fp-ts/function';

const add = (a: number) => (b: number) => a + b;
const add1 = add(1);
const add2 = add(2);
const add3 = add(3);
pipe(1, add1, add2, add3); // add3(add2(add1(1)))
pipe(1, add1, add2, add3, add3, add3, add3, add3); // add3(add3(add3(add3(add3(add2(add1(1)))))))

export default () => {};
