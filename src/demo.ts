import { flow, pipe } from 'fp-ts/Function';
import * as ID from 'fp-ts/Identity';

interface IResponse {
	name: string;
	next: string | undefined;
}

const makeUrl = (x: string) => `htpp://fp-ts.com?name=${x}`;
const requestSync = (url: string): IResponse => ({ name: 'flow', next: 'pipe' });
const handleResponse = ({ name, next }: IResponse) => `${name} >> ${next}`;

// =============== 结果值作为下一个函数的参数 =====================
// 命令式写法
const func01 = (name: string): string => {
	const url = makeUrl(name);
	const res = requestSync(url);
	return handleResponse(res);
};
console.log('func01: ', func01('api')); // flow >> pipe

// 洋葱式写法
const func02 = (name: string): string => handleResponse(requestSync(makeUrl(name)));
console.log('func02: ', func02('api')); // flow >> pipe

// 函数式编程写法：flow类似pipe，flow会将第一个函数的执行结果传递给下一个函数，并作为该函数的参数
const func03 = flow(makeUrl, requestSync, handleResponse);
console.log('func03: ', func03('api')); // flow >> pipe

// =============== 函数结果值的组合 =====================
// 命令式写法
const func04 = (name: string): string => {
	const url = makeUrl(name);
	const res = requestSync(url);
	const result = handleResponse(res);
	return `${url} : ${result}`;
};
console.log('func04: ', func04('api')); // htpp://fp-ts.com?name=api : flow >> pipe

// 函数式：flow，可读性太差了
const func05 = flow(
	makeUrl, // 返回 url，并作为下一个函数的参数
	url => ({ url, response: requestSync(url) }), // 返回 {url, response};
	({ response, ...others }) => ({ ...others, result: handleResponse(response) }), // 返回 { url, result }
	({ url, result }) => `${url} : ${result}`
);
console.log('func05: ', func05('api')); // htpp://fp-ts.com?name=api : flow >> pipe

// 优化 flow 版本：flow + pipe，pipe是调用版的flow
const func06 = flow(
	makeUrl,
	url => ({ url, result: pipe(url, requestSync, handleResponse) }),
	({ url, result }) => `${url} : ${result}`
);
console.log('func06: ', func06('api')); // htpp://fp-ts.com?name=api : flow >> pipe

// flow + Identity 方案
// bindTo 相当于于给对象增加一个属性
const func07 = flow(
	makeUrl,
	ID.bindTo('url'), // 第一次给对象增加url属性，
	// 第二次将makeUrl的结果传递给x => x.url，并给url属性赋值
	ID.bind(
		'result',
		flow(x => x.url, requestSync, handleResponse)
	), // 返回 { url, result: xxx }，bindTo 增加 rusult: value 键值对
	// 将收到的参数原样返回
	ID.map(({ url, result }) => `${url} : ${result}`)
);
console.log('func07: ', func07('api')); // htpp://fp-ts.com?name=api : flow >> pipe

const demo = 'demo';
export default demo;
