import { ChangeEvent, FormEvent } from 'react';
import useStateWithValidator from './hooks/useStateWithValidator';
import { validatePhoneNumber } from './utils';

const FormTest = () => {
	const [mobileNumber, setMobileNumber, error, mobileNumberValidator] = useStateWithValidator('', validatePhoneNumber);
	const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => setMobileNumber(e.target.value);

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
		const validators = [mobileNumberValidator];
		const isInvalid = validators.map(validator => validator.validate()).some(valid => !valid);
		if (isInvalid) {
			return;
		}
		alert('submit...');
	};

	return (
		<form onSubmit={onSubmit}>
			<input
				type="text"
				onChange={handleNumberChange}
				value={mobileNumber}
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
