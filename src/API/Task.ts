/*********************************/
// Task<A>、TaskEither<E, A>
// type Left<E> = { _tag: 'Left', left: E };
// type Right<A> = { _tag: 'Right', right: A};
// type Either<E, A> = Left<E> | Right<A>
// type Task<A> = { (): Promise<A> };
// type TaskEither<E, A> = Task<Either<E, A>>;
/*********************************/
import { Task } from 'fp-ts/lib/Task';
import { TaskEither, tryCatch } from 'fp-ts/lib/TaskEither';

// const read: Task<string> = () => {
// 	return new Promise<string>(resolve => {
// 		const r1 = createInterface({
// 			input: process.input,
// 			output: process.stdout,
// 		});

// 		r1.qurestion('Input:', answer => {
// 			r1.close();
// 			console.log(answer);
// 			resolve(answer);
// 		});
// 	});
// };

function taskEitherTest(isResolve: boolean): TaskEither<string, string> {
	return tryCatch(
		() => (isResolve ? Promise.resolve('resolved') : Promise.reject('rejected')),
		() => 'fall back string'
	);
}
async function run() {
	const resolve = taskEitherTest(true);
	const reject = taskEitherTest(false);

	await resolve(); // { _tag: 'Right', right: 'resolved' }
	await reject(); // { _tag: 'Left', left: 'fall back string' }
}
run();

/******** fromNullable **********/

export default () => {};
