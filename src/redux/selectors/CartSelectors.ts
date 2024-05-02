// @ts-nocheck
import { createSelector } from "redux-orm";
import orm from "../../orm";

export const cartSelector = createSelector(orm?.Cart)
export const orderSelector = createSelector(orm?.Order)
