import {CATEGORY_COLORS} from "../constants/categories";

export const coloredTags = (colorId?: number) => {
	switch (colorId) {
		case 0:
			return CATEGORY_COLORS.BLUE;
		case 1:
			return CATEGORY_COLORS.GREEN;
		case 2:
			return CATEGORY_COLORS.YELLOW;
		case 3:
			return CATEGORY_COLORS.PINK;
		case 4:
			return CATEGORY_COLORS.RED;
		default:
			return CATEGORY_COLORS.BLUE;
	}

}