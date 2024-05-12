import axios from "axios";
import marketStore from "../../models/markerModels";
import {clearProducts, getImages, getPrices} from "../../models/markerModels/Product";

const api = 'https://test2.sionic.ru/api/'

const {createCategories, createProducts} = marketStore;

export const getCategories = async (dispatch: any) => {
		await axios.get(api + 'Categories?sort=["name","ASC"]&range=[0,24]').then((response) => {
			const {data} = response;
			data.forEach((categoryData: any) => {
				dispatch(createCategories(categoryData));
			});
		}).catch((error) => {
			console.error('Error fetching and storing data:', error);
		});
}

export const getProducts = async (dispatch: any, params?: any) => {
	return await axios.get(`${api}Products?${params}`).then((response) => {
		const {data} = response;
		data.forEach((productData: any) => {
			dispatch(createProducts(productData));
		});
		return data;
	}).catch((error) => {
		console.error('Error fetching and storing data:', error);
	});
}

export const getProductPrices = async (dispatch: any, id?: any, signal?: any) => {
	await axios.get(`${api}ProductVariations/${id ? id : ''}`, {signal}).then((response) => {
		const {data} = response;
		if ((data?.length > 0)) {
			data?.forEach((productData: any) => {
				dispatch(getPrices(productData));
			});
		} else {
			dispatch(getPrices(data));
		}
	}).catch((error) => {
		console.error('Error fetching and storing data:', error);
	});
}

export const getProductImages = async (dispatch: any, params?: any) => {
	await axios.get(`${api}ProductImages?${params}`).then((response) => {
		if (response?.status=== 200) {
			const {data} = response;
			data.forEach((productData: any) => {
				dispatch(getImages(productData));
			});
			return response?.data;
		}
	}).catch((error) => {
		console.error('Error fetching and storing data:', error);
	});
}

export const clearAllProducts = async (dispatch: any, products: any) => {
	dispatch(clearProducts(products));
}
