import { createAction } from "@reduxjs/toolkit";
import Model, { attr } from "redux-orm";

export const createCart = createAction("models/cart/create");
export const removeCart = createAction("models/cart/remove");

export class Cart extends Model {
	static modelName = "Cart";

	static get fields() {
		return {
			id: attr(),
			name: attr(),
			price: attr(),
			stock: attr(),
			image_url: attr(),
			image_name: attr(),
			isInCart: attr(),
			count: attr(),
		};
	}

	static reducer({ type, payload }: any, Cart: any, session: any) {
		switch (type) {
			case createCart.type: {
				if (!payload.id || !payload.name) {
					console.warn("Unable to create a cart");
				} else {
					Cart.upsert({...payload, isInCart: true, count: 1});
				}
				break;
			}
			case removeCart.type: {
				Cart.all().delete()
				break;
			}
			default:
				break;
		}
	}
}
