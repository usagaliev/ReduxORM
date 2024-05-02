// @ts-nocheck

import { createSelector } from "redux-orm";
import orm from "../../orm";

export const categorySelector = createSelector(orm.Category)
export const productSelector = createSelector(orm.Product)