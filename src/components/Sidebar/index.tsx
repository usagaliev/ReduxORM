import React from 'react';
import UiButton from "../../ui/UiButton";
import './style.scss';
import freeImage from '../../images/free-image.png';
import bgImage1 from '../../images/bg-1.png';
import bgImage2 from '../../images/bg-2.png';

interface SidebarItem {
	bg: string;
	title: string;
	id: number;
}

const Sidebar = () => {
	const sidebarItems = [
		{bg: bgImage1, title: 'Новая коллекция', id: 1},
		{bg: bgImage2, title: 'Новая коллекция',  id: 2},
		{bg: bgImage1, title: 'Новая коллекция', id: 3},
	]

	return (
		<div className='sidebar sidebar-container'>
			<div className='see-more-block'>
				<img src={freeImage} alt='free' />
				<div className='see-more-content'>
					<div>Получай товары БЕСПЛАТНО!</div>
					<UiButton text='Узнать подробнее' />
				</div>
			</div>
			{sidebarItems?.map((item: SidebarItem) => (
				<div className='sidebar_item'
				     style={{backgroundImage: `url(${item.bg}), linear-gradient(180deg, rgba(255, 104, 29, 0.462745) 0%, rgba(19, 7, 0, 0.65098) 100%)`}}
				     key={item.id}
				>
					<div className='sidebar_item_title'>{item.title}</div>
				</div>
			))}
		</div>
	);
};

export default Sidebar;