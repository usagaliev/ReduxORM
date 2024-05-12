import React, {FC} from 'react';
import icons from "../../icons";
import './style.scss'

interface UiIconProps {
	name: string;
	onClick?: () => void;
	additionalClassName?: string;
}

const UiIcon: FC<UiIconProps> = ({name, onClick, additionalClassName}) => {
	const getIcon = (
		name: string,
	): React.FC<React.SVGProps<SVGSVGElement>> => {
		const iconElement = icons as any;
		return iconElement[name];
	};

	if (!name) {
		return null;
	}

	const Icon = getIcon(name);

	if (Icon) {
		return (
			<div
				className={`ui-icon ${additionalClassName}`}
				onClick={onClick}
				style={{cursor: onClick ? 'pointer' : 'default'}}
			>
				<Icon />
			</div>
		);
	}

	return null;
};

export default UiIcon;