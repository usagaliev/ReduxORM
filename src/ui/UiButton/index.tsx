import React, {FC} from 'react';
import UiIcon from "../UiIcon";
import './style.scss';

interface UiButtonProps {
	text?: string;
	icon?: string;
	onClick?: () => void;
	additionalClassName?: string;
	type?: 'button' | 'submit' | 'reset';
}

const UiButton: FC<UiButtonProps> = ({text, icon, additionalClassName, onClick,}, props) => {
	return (
		<button className={`ui-button ${additionalClassName}`} onClick={onClick} {...props}>
			{text}
			{icon && (
				<UiIcon name={icon} />
			)}
		</button>
	);
};

export default UiButton;