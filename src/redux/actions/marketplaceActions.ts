import axios from "axios";
import marketStore from "../../models/markerModels";
import {getImages, getPrices} from "../../models/markerModels/Product";

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
	await axios.get(`${api}Products?${params}`).then((response) => {
		const {data} = response;
		data.forEach((productData: any) => {
			console.log(productData, 'productData');
			dispatch(createProducts(productData));
		});
		console.log(data, 'data');
	}).catch((error) => {
		console.error('Error fetching and storing data:', error);
	});
}

export const getProductPrices = async (dispatch: any, params?: any) => {
	await axios.get(api + 'ProductVariations').then((response) => {
		const {data} = response;
		data.forEach((productData: any) => {
			dispatch(getPrices(productData));
		});
		return data;
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
