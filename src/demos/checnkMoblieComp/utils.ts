import type { Predicate } from 'fp-ts/Predicate';
import { Either, chain, fromPredicate } from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';
import { every, map } from 'fp-ts/Array';

const startsWith =
	(search: string): Predicate<string> =>
	(text: string) =>
		text.startsWith(search);

const minLength =
	(limit: number): Predicate<string> =>
	(text: string) =>
		text.length >= limit;

const maxLength =
	(limit: number): Predicate<string> =>
	(text: string) =>
		text.length <= limit;

const testPhoneNumberPattern = (text: string) => !/[^0-9]/gi.test(text);

// test
// const myMobileNum = '01012345';
// testPhoneNumberPattern(myMobileNum); // true
// testPhoneNumberPattern('0101a2345'); // false
// startsWith('01')(myMobileNum); // true
// maxLength(11)(myMobileNum); // true
// minLength(10)(myMobileNum); // false

const validate =
	<T>(validators: Array<Predicate<T>>, errorMessage: string) =>
	(value: T) =>
		pipe(
			value,
			fromPredicate(
				val =>
					pipe(
						validators,
						map(fn => fn(val)),
						every(Boolean)
					),
				() => errorMessage
			)
		);

export const validatePhoneNumber = (phoneNumber: string): Either<string, string> =>
	pipe(
		phoneNumber,
		validate([minLength(1)], 'moblie number can not be empty'),
		chain(
			validate(
				[testPhoneNumberPattern, startsWith('01'), minLength(10), maxLength(11)],
				'moble number must confirm the rule'
			)
		)
	);

// test:
// validatePhoneNumber(''); // Left('moblie number can not be empty')
// validatePhoneNumber('0123abc'); // Left('moble number must confirm the rule')
// validatePhoneNumber('01011234567'); // Right('01011234567')
