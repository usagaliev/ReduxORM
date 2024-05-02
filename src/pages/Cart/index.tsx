import React, {useEffect, useState} from 'react';
import UiButton from "../../ui/UiButton";
import './style.scss';
import UiInput from "../../ui/UiInput";
import UiIcon from "../../ui/UiIcon";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {cartSelector, orderSelector} from "../../redux/selectors/CartSelectors";
import {Product} from "../../types";
import {makeOrder, removeFromCart} from "../../redux/actions/cartActions";
import {useNavigate} from "react-router-dom";

const Cart = () => {
	const dispatch = useAppDispatch();
	const cartProducts = useAppSelector(cartSelector) as Product[];
	const order = useAppSelector(orderSelector);
	const navigate = useNavigate()
	const [internalCartProducts, setInternalCartProducts] = useState(cartProducts);
	const [totalPrice, setTotalPrice] = useState(0);
	const [cart, setCart] = useState();
	const [inputValue, setInputValue] = useState(1);
	const count = 1;

	useEffect(() => {
		const totalPrice = internalCartProducts?.reduce((acc, product) =>
			product.count ? ((acc + product.price) * product.count) : (acc + product.price), 0);
		setTotalPrice(totalPrice);
	}, [inputValue, cartProducts]);

	useEffect(() => {
		const updatedCart = {
			totalPrice,
			products: internalCartProducts
		};
		setCart(updatedCart as any);
	}, [internalCartProducts, totalPrice]);

	const handleStepPlus = (product: Product) => {
		const updatedProducts = internalCartProducts.map((cartProduct) => {
			if (cartProduct.id === product.id) {
				return {
					...cartProduct,
					count: (cartProduct.count || 0) + 1,
					totalProductPrice: (cartProduct.count || 1) * cartProduct.price
				};
			}
			return cartProduct;
		});
		setInternalCartProducts(updatedProducts);
	};

	const handleStepMinus = (product: Product) => {
		const updatedProducts = internalCartProducts.map((cartProduct) => {
			if (cartProduct.id === product.id) {
				const newCount = Math.max((cartProduct.count || 0) - 1, 1);
				return {
					...cartProduct,
					count: newCount,
					totalProductPrice: newCount * cartProduct.price
				};
			}
			return cartProduct;
		});
		setInternalCartProducts(updatedProducts);
	};

	const handleOrder = () => {
		if (cart) {
			makeOrder(cart, dispatch);
			navigate('/order')
		}
	}

	const handleClearCart = () => {
		removeFromCart(cartProducts, dispatch)
		setInternalCartProducts([]);
		setTotalPrice(0);
	}

	return (
		<div className='basket'>
			<div className='basket_title_container'>
				<h4 className='basket_title'>Корзина</h4>
				<UiButton text='Очистить корзину' onClick={handleClearCart} />
			</div>
			<div className='basket_main_block'>
				<div className='basket_main_block_title'>
					<h4>Товары в корзине</h4>
					<div className='total_price_block'>
						<span className='price_title'>Стоимость корзины:</span>
						<span className='price'>{totalPrice} ₽</span>
					</div>
					<UiButton text='Оформить' onClick={handleOrder}/>
					<div className='decorations'>
						<div className='decorations_pack'></div>
						<div className='decorations_ticket'></div>
						<div className='decorations_cart'></div>
					</div>
				</div>
				{internalCartProducts?.map((product) => (
					<div className='basket_main_block_products'>
						<div className='basket_product_image'>
							<img src={product?.image_url} alt={product?.image_name}/>
						</div>
						<div className='basket_product_info'>
							<span className='basket_product_title'>{product?.name}</span>
							<div className='basket_product_info_stock'>
								<span className='basket_product_stock'>{`${product?.stock} шт.`}</span>
								<span className='basket_product_count'>Куплено: 150 шт.</span>
							</div>
						</div>
						<div className='basket_product_count_block'>
							<UiInput
								type='number'
								value={product.count || count}
								stepButtons
								handleStepPlus={() => {
									setInputValue(inputValue + 1)
									handleStepPlus(product);
								}}
								handleStepMinus={() => {
									setInputValue(inputValue - 1)
									handleStepMinus(product);
								}}
							/>
						</div>
						<div className='basket_product_price_block'>
							<span className='product_price'>{`от ${product?.price} ₽`}</span>
						</div>
						<div className='basket_product_remove_block'>
							<UiIcon name='RemoveIcon' onClick={() => {
							}}/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Cart;