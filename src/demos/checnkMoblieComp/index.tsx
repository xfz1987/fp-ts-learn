import { useState, ChangeEvent, FormEvent } from 'react';

const FormTest = () => {
	const [mobleNumber, setMobileNumber] = useState('');
	const [error, setError] = useState('');

	const validateMobileNumber = (value: string): boolean => {
		if (!value) {
			setError('moblie number can not be empty');
			return false;
		}

		if (!/^1[3-9]\d{9}$/.test(value)) {
			setError('moble number does not follow the rule');
			return false;
		}

		setError('');

		return true;
	};

	const anotherValidate = (value: string) => {
		return true;
	};

	const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		validateMobileNumber(value);
		setMobileNumber(value);
	};

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
		const validations = [validateMobileNumber(mobleNumber), anotherValidate(mobleNumber)];
		if (validations.some(valid => !valid)) {
			return;
		}
		alert('submit...');
	};

	return (
		<form onSubmit={onSubmit}>
			<input
				type="text"
				onChange={handleNumberChange}
				value={mobleNumber}
			/>
			<span
				className="error"
				style={{ color: 'red' }}
			>
				{error}
			</span>
			<div>
				<button type="submit">submit</button>
			</div>
		</form>
	);
};

export default FormTest;
