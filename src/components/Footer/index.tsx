import React from 'react';
import appStoreImage from '../../images/appStore.png';
import googlePlayImage from '../../images/googlePlay.png';
import UiIcon from "../../ui/UiIcon";
import './style.scss';

const Footer = () => {
	return (
		<footer className='footer'>
			<div className='footer_containter'>
				<div className='footer_main'>
					<h1>React</h1>
					<div className='footer_main_links'>
						<div className='footer_main_block'>
							<span>Присоединяйтесь к нам</span>
							<div className='social-media'>
								<a href=''><UiIcon name='FacebookIcon'/></a>
								<a href=''><UiIcon name='VkIcon'/></a>
								<a href=''><UiIcon name='InstagramIcon'/></a>
							</div>
						</div>
						<div className='footer_main_block second_block'>
							<span>Устанавливайте приложение</span>
							<div className='app-links'>
								<a href=''><img src={appStoreImage} alt='App Store'/></a>
								<a href=''><img src={googlePlayImage} alt='Google Play'/></a>
							</div>
						</div>
					</div>
				</div>
				<div className='footer_bottom'>
					<a href=''>© Sionic</a>
					<a href=''>Правовая информация</a>
					<a href=''>Политика конфиденциальности</a>
				</div>
			</div>
		</footer>
	);
};

export default Footer;