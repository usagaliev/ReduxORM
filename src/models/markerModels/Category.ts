import { createAction } from "@reduxjs/toolkit";
import Model, { attr } from "redux-orm";

export const createCategories = createAction("models/category/create");

export class Category extends Model {
	static modelName = "Category";

	static get fields() {
		return {
			id: attr(),
			name: attr(),
			parent_id: attr(),
		};
	}

	static reducer({ type, payload }: any, Category: any, session: any) {
		switch (type) {
			case createCategories.type: {
				if (!payload.id || !payload.name) {
					console.warn("Unable to create a category");
				} else {
					Category.upsert(payload);
				}
				break;
			}
			default:
				break;
		}
	}
}
