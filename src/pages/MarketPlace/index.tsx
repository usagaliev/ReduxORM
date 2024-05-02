import React, {useEffect, useState} from 'react';
import './style.scss';
import { Slide } from 'react-slideshow-image';
import {Category, Product} from "../../types";
import {getCategories, getProductImages, getProductPrices, getProducts} from "../../redux/actions/marketplaceActions";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {categorySelector, productSelector} from "../../redux/selectors/MarketplaceSelectors";
import Categories from "../../components/Categories";
import {slicedText} from "../../helpers/slicedText";
import UiButton from "../../ui/UiButton";
import {Link} from "react-router-dom";
import {addToCart} from "../../redux/actions/cartActions";
import {cartSelector} from "../../redux/selectors/CartSelectors";

const MarketPlace: React.FC = () => {
	const dispatch = useAppDispatch();
	const [activeCategories, setActiveCategories] = useState<number[]>([]);
	const [range, setRange] = useState(50);
	const [categoryIds, setCategoryIds] = useState<number[]>([]);
	const categories = useAppSelector(categorySelector) as Category[];
	const products = useAppSelector(productSelector) as Product[]
	const productsInCart = useAppSelector(cartSelector) as Product[]
	const [fullProducts, setFullProducts] = useState<Product[]>(
		products?.filter((product) =>
			product.image_url && product.price && product.name)
			.map((product) => ({
				...product,
				isInCart: productsInCart.some((cartProduct) => cartProduct.id === product.id),
			})))
	const [isLoading, setIsLoading] = useState(false);

	const productIds = products?.map((product) => product?.productsToShow).filter((id) => id);

	const spanStyle = {
		padding: '20px',
		background: '#efefef',
		color: '#000000'
	}

	const divStyle = {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundSize: 'cover',
		height: '400px'
	}

	const slideshow = (product: any) => {
		const imagesToSlide = []

		if (product?.id === product?.product_id) {
			imagesToSlide.push(product)
		}

		return (
			<div className="slide-container">
				<Slide>
					{imagesToSlide?.map((slideImage: any)=> (
						<div key={slideImage.id}>
							<div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.image_url})` }}>
								<span style={spanStyle}>{slideImage.image_name}</span>
							</div>
						</div>
					))}
				</Slide>
			</div>
		)
	}

	const queryParamsHandler = ({filter, sort, range}: any) => {
		const queryParams = {
			sort,
			range,
			filter,
		}
		const params = new URLSearchParams()

		Object.entries(queryParams).forEach(([key, value]) => {
			if (value) {
				params.append(key, String(value))
			}
		})
		return decodeURIComponent(params.toString())
	}

	const categoryParams = queryParamsHandler({
		sort: `["id","ASC"]`,
		range: `[0,${range}]`,
		filter: categoryIds?.length && `{"category_id":[${categoryIds}]}`,
	})

	const productsParams = queryParamsHandler({
		range: `[0,${range}]`,
		filter: productIds?.length && `{"product_id":[${productIds}]}`,
	})

	console.log(products, 'products');

	const fetchData = async () => {
		setIsLoading(true);
		await getCategories(dispatch);
		await getProducts(dispatch, categoryParams);
		await getProductImages(dispatch, productsParams);
		await getProductPrices(dispatch);
	};

	const handleFilter = (categoryId: number) => {
		setCategoryIds((prev) => {
			if (prev.includes(categoryId)) {
				return prev.filter((id) => id !== categoryId)
			} else {
				return [...prev, categoryId]
			}
		})
	}

	useEffect(() => {
		fetchData();
	}, [dispatch, categoryParams, categoryIds]);

	useEffect(() => {
		setFullProducts(products?.filter((product) => {
			if (product.image_url && product.price && product.name) {
				setIsLoading(false);
			}
			return product.price && product.name && product.image_url;
		}).map((product) => ({
				...product,
				isInCart: productsInCart.some((cartProduct) => cartProduct.id === product.id),
			})))
	}, [products]);

	const toggleActive = (categoryId: number) => {
		setActiveCategories((prevActive) =>
			prevActive.includes(categoryId)
				? prevActive.filter((id) => id !== categoryId)
				: [...prevActive, categoryId]
		);
	};

	const handleAddToCart = (id: number, product: Product) => {
		if (!id) return;

		addToCart(product, dispatch);

		setFullProducts((prev) => {
			return prev.map((product) => {
				if (product.id === id) {
					return {
						...product,
						isInCart: true,
					};
				}
				return product;
			});
		});

	}

	return (
		<div className='marketplace'>
			<div className='marketplace_title_container'>
				<h4 className='marketplace_title'>Категории товаров</h4>
				<a className='marketplace_settings'>
					Настройки
				</a>
			</div>
			<div className='categories'>
				{categories?.map((category) => (
					<Categories category={category} onClick={handleFilter} activeCategories={activeCategories} toggleActive={toggleActive} />
				))}
			</div>
			<div className='products'>
				{!isLoading ? fullProducts?.map((product: Product) => {
					return (
						<div className='product'>
							<div className='categories'>
								{categories?.map((category) => {
									if (category.id === product.category_id) {
										return (
											<Categories
												category={category}
												activeCategories={activeCategories}
												toggleActive={toggleActive}
											/>
										);
									}
								})}
								</div>
							{/*{slideshow(product)}*/}
							<img src={product?.image_url} alt={product?.image_name}/>
							<span className='product_title' title={product?.name}>{slicedText(product?.name, 40)}</span>
							<span className='product_price'>{`от ${product?.price?.toLocaleString()} ₽`}</span>
							{product.isInCart ? (
								<Link to='/cart'>
									<UiButton additionalClassName='to_cart_button' text='Перейти в корзину' />
								</Link>
							) : (
								<UiButton text='Добавить в корзину' onClick={() => handleAddToCart(product?.id, product)} />
							)}
						</div>
					);
				}) : <span className='loader'>Загрузка...</span>}
			</div>
		</div>
	);
};

export default MarketPlace;
