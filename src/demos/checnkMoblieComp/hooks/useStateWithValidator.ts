import { useState } from 'react';
import { Either, match } from 'fp-ts/Either';
import { empty, isEmpty } from 'fp-ts/string';
import { identity, pipe } from 'fp-ts/function';

type StateValidator = {
	validate: () => boolean;
	error: string;
};

const useStateWithValidator = <T>(
	initialState: T,
	validator: (v: T) => Either<string, T>
): [T, (v: T) => void, string, StateValidator] => {
	const [value, setValue] = useState<T>(initialState);
	const [error, setError] = useState('');

	const changeError = (errorMessage: string): string => {
		setError(errorMessage);
		return errorMessage;
	};

	const changeValue = (v: T): void => {
		pipe(
			v,
			setValue,
			() => validator(v),
			match(identity, () => empty),
			// match(identity, () => pipe(v, setValue, () => empty)),
			changeError
		);
	};

	const stateValidator: StateValidator = {
		validate(): boolean {
			return pipe(
				validator(value),
				match(identity, () => empty),
				changeError,
				isEmpty
			);
		},
		get error(): string {
			return error;
		},
	};

	return [value, changeValue, error, stateValidator];
};

export default useStateWithValidator;
