import React, { SVGProps } from 'react';

const PinIcon = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" {...props}>
			<path
				d="M16.25 7.75C16.25 13 9.5 19 9.5 19C9.5 19 2.75 13 2.75 7.75C2.75 5.95979 3.46116 4.2429 4.72703 2.97703C5.9929 1.71116 7.70979 1 9.5 1C11.2902 1 13.0071 1.71116 14.273 2.97703C15.5388 4.2429 16.25 5.95979 16.25 7.75Z"
				stroke="#2D2D2F" strokeLinecap="round" strokeLinejoin="round"/>
			<path
				d="M9.5 10C10.7426 10 11.75 8.99264 11.75 7.75C11.75 6.50736 10.7426 5.5 9.5 5.5C8.25736 5.5 7.25 6.50736 7.25 7.75C7.25 8.99264 8.25736 10 9.5 10Z"
				stroke="#2D2D2F" strokeLinecap="round" strokeLinejoin="round"/>
		</svg>

	);
};

export default PinIcon;