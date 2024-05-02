import { createAction } from "@reduxjs/toolkit";
import Model, { attr } from "redux-orm";

export const createOrder = createAction("models/order/create");

export class Order extends Model {
	static modelName = "Order";

	static get fields() {
		return {
			id: attr(),
			name: attr(),
			price: attr(),
			stock: attr(),
			image_url: attr(),
			image_name: attr(),
			count: attr(),
		};
	}

	static reducer({ type, payload }: any, Order: any, session: any) {
		switch (type) {
			case createOrder.type: {
				if (!payload.totalPrice) {
					console.warn("Unable to create a order");
				} else {
					Order.upsert(payload);
				}
				break;
			}
			default:
				break;
		}
	}
}
