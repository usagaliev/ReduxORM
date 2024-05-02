export interface Product {
	id: number;
	name: string;
	price: number;
}

export interface Category {
	name: string;
	parent_id: number;
	id: number;
}

export interface Product {
	category_id: number;
	name: string;
	description: string;
	id: number;
	stock: number;
	image_url: string;
	image_name: string;
	product_id: number;
	price: number;
	productsToShow: number;
	isInCart?: boolean;
	totalProductPrice?: number;
	count?: number;
}

export interface CartItem {
	productId: number;
	quantity: number;
}
