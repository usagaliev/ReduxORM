import {createCart, removeCart} from "../../models/cartModels/Cart";
import {createOrder} from "../../models/cartModels/Order";

export const addToCart = (productObject: any, dispatch: any) => dispatch(createCart(productObject))
export const removeFromCart = (productObject: any, dispatch: any) => dispatch(removeCart(productObject))
export const makeOrder = (products: any, dispatch: any) => dispatch(createOrder(products))