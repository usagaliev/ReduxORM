import UiIcon from "../../ui/UiIcon";
import './style.scss';
import UiInput from "../../ui/UiInput";
import userImage from '../../images/user-image.png';
import {slicedText} from "../../helpers/slicedText";
import {Link, useNavigate} from "react-router-dom";
import {useAppSelector} from "../../hooks/hooks";
import {cartSelector} from "../../redux/selectors/CartSelectors";

const Header = () => {
	const cartProducts = useAppSelector(cartSelector) as any
	const counter = cartProducts && cartProducts?.length;
	const navigate = useNavigate()

	return (
		<>
			<header className='header-container'>
				<Link to={'/'}>
					<h1>React</h1>
				</Link>
				<div className='header-location'>
					<UiIcon name='PinIcon'/>
					<span>{slicedText('Александровск-Сахалинский', 16)}</span>
				</div>
				<div className='header-search'>
					<UiInput placeholder='Поиск бренда, товара, категории...' icon='SearchIcon' type='text' searchButton/>
				</div>
				<div className='header-cart'>
					<UiIcon name='CartIcon' onClick={() => navigate('/cart') } />
					<span className='cart-counter'>
						<span className='cart-counter-text'>{counter || 0}+</span>
					</span>
				</div>
				<div className='header-user'>
					<img src={userImage} alt='user'/>
				</div>
			</header>
		</>
	);
};

export default Header;