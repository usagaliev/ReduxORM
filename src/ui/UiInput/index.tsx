import React, {FC} from 'react';
import './style.scss';
import UiButton from "../UiButton";
import UiIcon from "../UiIcon";

interface UiInputProps {
	type?: string;
	placeholder?: string;
	searchButton?: boolean;
	icon?: string;
	value?: string | number
	stepButtons?: boolean;
	handleStepMinus?: () => void;
	handleStepPlus?: () => void;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	prefixIcon?: string;
	required?: boolean;
	error?: boolean;
}

const UiInput: FC<UiInputProps> = ({
		stepButtons,
		value,
		icon,
		type,
		placeholder,
		searchButton,
		handleStepMinus,
		handleStepPlus,
		onChange,
		prefixIcon,
		error
	}, props) => {

	return (
		<div className='input-container' style={error ? { borderColor: error && 'red' } : {}}>
			{stepButtons && <UiIcon name='MinusIcon' onClick={handleStepMinus}/>}
			{prefixIcon && <UiIcon name={prefixIcon} />}
			<input onChange={onChange} type={type} placeholder={placeholder} value={value} className='ui-input' {...props} />
			{stepButtons && <UiIcon name='PlusIcon' onClick={handleStepPlus}/>}
			{searchButton && (
				<div>
					<UiButton icon={icon} />
				</div>
			)}
		</div>
	);
};

export default UiInput;