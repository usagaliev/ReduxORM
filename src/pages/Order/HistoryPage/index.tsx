import React, { useEffect, useState } from 'react';
import './style.scss';
import orderImage from '../../../images/order-image.png';
import UiButton from '../../../ui/UiButton';
import UiIcon from '../../../ui/UiIcon';

const HistoryPage = () => {
	const [initialHistory, setInitialHistory] = useState([]);
	const [openBlocks, setOpenBlocks] = useState<any>({});
	const orderHistory = localStorage.getItem('order');

	const formatDate = (date: string) => {
		const dateString = new Date(date);
		const day = dateString.getDate();
		const month = dateString.getMonth() + 1;
		const year = dateString.getFullYear();
		return `${day}.${month}.${year}`;
	};

	useEffect(() => {
		if (orderHistory) {
			const parsedHistory = JSON.parse(orderHistory);
			setInitialHistory(parsedHistory);
			const initialOpenBlocks: any = {};
			parsedHistory.forEach((order: any) => {
				initialOpenBlocks[order.orderId] = false;
			});
			setOpenBlocks(initialOpenBlocks);
		}
	}, [orderHistory]);

	const handleCopy = (text: string) => {
		navigator?.clipboard?.writeText(text);
	};

	const toggleOpenBlock = (orderId: string) => {
		setOpenBlocks((prevOpenBlocks: any) => ({
			...prevOpenBlocks,
			[orderId]: !prevOpenBlocks[orderId],
		}));
	};

	return (
		<div className="history">
			<h4>История заказов</h4>
			<div className="history_container">
				{initialHistory?.map((order: any) => (
					<div key={order.orderId} className="history_item">
						<div className="history_item_info_container">
							<div className="history_item_info">
								<div className="history-order-image">
									<img src={orderImage} alt="order" />
								</div>
								<div className="history_item_info_title">
									<h5>Xiaomi</h5>
									<p>{formatDate(order?.orderInfo?.date)}</p>
								</div>
								<div className="history_item_info_button">
									<UiButton
										text="Подробнее"
										onClick={() => toggleOpenBlock(order.orderId)}
									/>
								</div>
							</div>
							<UiIcon
								name="ArrowIcon"
								additionalClassName={!openBlocks[order.orderId] ? 'rotate' : ''}
								onClick={() => toggleOpenBlock(order.orderId)}
							/>
						</div>
						{openBlocks[order.orderId] && (
							<div className="history_item_products">
								<div className="history_item_products_block">
									<div className="history_item_products_status">
										<p className="title">Статус заказа</p>
										<p>{order.orderStatus}</p>
									</div>
									<div className="history_item_products_orderNo">
										<p className="title">Номер заказа</p>
										<div
											className="history_item_products_orderNo_text"
											onClick={() => handleCopy(order?.orderName)}
										>
											<p>{order.orderName}</p>
											<UiIcon name="CopyIcon" onClick={() => {}} />
										</div>
									</div>
								</div>
								<div className="history_item_products_block">
									<div className="history_item_products_count">
										<p className="title">Кол-во товаров</p>
										<p>{order.totalCount} шт.</p>
									</div>
									<div className="history_item_products_price">
										<p className="title">Стоимость заказа</p>
										<p>{order?.total.toLocaleString()}₽</p>
									</div>
									<div className="history_item_products_address">
										<p className="title">Адрес доставки</p>
										<p>{order?.orderInfo?.address}</p>
									</div>
								</div>
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default HistoryPage;
