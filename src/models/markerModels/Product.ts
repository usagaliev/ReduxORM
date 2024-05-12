import { createAction } from "@reduxjs/toolkit";
import Model, {attr} from "redux-orm";
import {createCategories} from "./Category";
import {createCart} from "../cartModels/Cart";

export const createProducts = createAction("models/product/create");
export const getImages = createAction("models/product/getImages");
export const getPrices = createAction("models/product/getPrices");
export const clearProducts = createAction("models/product/clear");

export class Product extends Model {
	static modelName = "Product";

	static get fields() {
		return {
			name: attr(),
			parent_id: attr(),
			image_name: attr(),
			image_url: attr(),
			product_id: attr(),
			price: attr(),
			stock: attr(),
			description: attr(),
			productsToShow: attr(),
			newIds: attr(),
		};
	}

	static reducer({ type, payload }: any, Product: any, session: any) {
		switch (type) {
			case createProducts.type: {
				Product.upsert({...payload, newIds: payload.id});
				break;
			}
			case getImages.type: {
				const { product_id, image_name, image_url } = payload;
				const product = Product.withId(product_id);
				product?.update({ image_name, image_url, product_id, productsToShow: product_id });
				break;
			}
			case getPrices.type: {
				const { price, product_id, stock } = payload;
				const product = Product.withId(product_id);
				product?.update({ price, product_id, stock });

				break;
			}
			case clearProducts.type: {
				Product.all().delete();
				break;
			}
			default:
				break;
		}
	}
}
