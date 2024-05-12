import React, {useState} from 'react';
import './style.scss';
import {Controller, useForm} from "react-hook-form";
import UiInput from "../../ui/UiInput";
import {TimePicker, DatePicker} from "@mui/x-date-pickers";
import TextField from "@mui/material/TextField";
import UiButton from "../../ui/UiButton";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {cartSelector, orderSelector} from "../../redux/selectors/CartSelectors";
import {clearOrders, removeFromCart} from "../../redux/actions/cartActions";
import {useNavigate} from "react-router-dom";

const OrderPage = () => {
	const orderData = useAppSelector(orderSelector) as any;
	const cartProducts = useAppSelector(cartSelector)
	const dispatch = useAppDispatch();
	const navigate = useNavigate()

	const schema = yup.object().shape({
		name: yup.string().required(),
		address: yup.string().required(),
		phone: yup.string().required(),
		date: yup.string().required(),
		time: yup.string().required(),
	});
	const {control, handleSubmit, formState: {errors}, setError} = useForm({
		mode: 'all',
		resolver: yupResolver(schema)
	});

	const [date, setDate] = useState<any>(null);
	const [time, setTime] = useState<any>(null);
	const [openDate, setOpenDate] = useState(false);
	const [openTime, setOpenTime] = useState(false);

	const deliveryPrice = 300;
	const totalPrice = orderData?.length && orderData[0]?.totalPrice;
	const totalCount = orderData?.length && orderData[0]?.totalProducts;
	const total = totalPrice + deliveryPrice;

	const handleOpen = (type: string) => {
		if (type === 'date') setOpenDate(true);
		if (type === 'time') setOpenTime(true);
	};

	const handleClose = (type: string) => {
		if (type === 'date') setOpenDate(false);
		if (type === 'time') setOpenTime(false);
	};

	const handleDateChange = (newDate: any) => {
		const dateString = new Date(newDate);
		const day = dateString.getDate();
		const month = dateString.getMonth() + 1;
		const year = dateString.getFullYear();
		const formattedDate = `${day}/${month}/${year}`;
		setDate(formattedDate);
		handleClose('date');
	};

	const handleTimeChange = (newTime: any) => {
		const timeString = new Date(newTime);
		const hours = timeString.getHours();
		const minutes = timeString.getMinutes();
		const formattedTime = `${hours}:${minutes}`;
		setTime(formattedTime);
		handleClose('time');
	}

	const onSubmit = (data: any) => {
		const id = Date.now().toString();
		const orders = localStorage.getItem('order');
		const parsedOrders = orders ? JSON.parse(orders) : [];
		const allOrders = [];

		const collectData = {
			orderData,
			orderInfo: data,
			orderId: id,
			orderName: `#${id}`,
			orderStatus: 'Оплачен/Завершен',
			totalCount,
			total
		};

		if (parsedOrders.length) {
			const existingOrder = parsedOrders.find((order: any) => order.orderId !== id);
			if (existingOrder) {
				allOrders.push(...parsedOrders, collectData);
			} else {
				allOrders.push(...parsedOrders);
			}
		} else {
			allOrders.push(collectData);
		}

		localStorage.setItem('order', JSON.stringify(allOrders));

		removeFromCart(cartProducts, dispatch);
		clearOrders(cartProducts, dispatch);
		navigate('/order-history');
	}


	return (
		<div className='order'>
			<h4 className='order_title'>Доставка</h4>
			<div className='order_container'>
				<div className='order_form'>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className='form_block'>
							<div className='order_form_row'>
								<span className='order_form_title'>Когда доставить?</span>
								<div className='date_picker_container'>
									<Controller
										control={control}
										render={({field}) => (
											<div onClick={() => handleOpen('date')}>
												<TextField
													variant="outlined"
													value={date ? date : 'Выберите дату'}
													required
													error={!!errors?.date}
													InputProps={{
														readOnly: true,
													}}
												/>
												{openDate && (
													<DatePicker
														className='date_picker_to_hide'
														format={'DD/MM/YYYY'}
														value={field.value as any}
														onChange={(e) => {
															field.onChange(e);
															handleDateChange(e);
														}}
														open={openDate}
														onClose={() => handleClose('date')}
													/>
												)}
											</div>
										)}
										name='date'
									/>
									<Controller
										control={control}
										render={({field}) => (
											<div onClick={() => handleOpen('time')}>
												<TextField
													variant="outlined"
													required
													error={!!errors?.time}
													value={time ? time : 'Выберите время'}
													InputProps={{
														readOnly: true,
													}}
												/>
												{openTime && (
													<TimePicker
														className='date_picker_to_hide'
														format={'DD/MM/YYYY'}
														value={field.value as any}
														onChange={(e) => {
															field.onChange(e);
															handleTimeChange(e);
														}}
														open={openTime}
														onClose={() => handleClose('time')}
													/>
												)}
											</div>
										)}
										name='time'
									/>
								</div>
							</div>
							<div className='order_form_row'>
								<span className='order_form_title'>Куда доставить?</span>
								<Controller
									control={control}
									render={({field}) => (
										<UiInput
											required
											prefixIcon='NavigateIcon'
											type='text'
											value={field.value}
											placeholder='Выберите адрес доставки'
											error={!!errors?.address}
											onChange={field.onChange}
										/>
									)}
									name='address'
								/>
							</div>
							<div className='order_form_row'>
								<span className='order_form_title'>Имя</span>
								<Controller
									control={control}
									render={({field}) => (
										<UiInput
											required
											type='text'
											value={field.value}
											error={!!errors?.name}
											onChange={field.onChange}
										/>
									)}
									name='name'
								/>
							</div>
							<div className='order_form_row'>
								<span className='order_form_title'>Телефон</span>
								<Controller
									control={control}
									render={({field}) => (
										<UiInput
											error={!!errors?.phone}
											required
											type='text'
											value={field.value}
											onChange={field.onChange}
										/>
									)}
									name='phone'
								/>
							</div>
						</div>
						<div className='order_list'>
							<div className='order_list_price_block'>
								<div className='order_list_total_price item'>
									<span>Стоимость товаров:</span>
									<span>{totalPrice.toLocaleString()}₽</span>
								</div>
								<div className='order_list_delivery_price item'>
									<span>Стоимость доставки:</span>
									<span>{deliveryPrice}₽</span>
								</div>
								<div className='order_list_total item'>
									<span>Итого:</span>
									<span className='order_list_total_bold'>{total.toLocaleString()}₽</span>
								</div>
							</div>
							<div className='order_list_button_block'>
								<UiButton text='Сделать заказ' type='submit'/>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default OrderPage;