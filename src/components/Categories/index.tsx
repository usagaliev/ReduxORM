import React, {FC} from 'react';
import {coloredTags} from "../../helpers/coloredTags";
import {Category} from "../../types";

interface CategoriesProps {
	category: Category;
	activeCategories?: number[];
	toggleActive?: (categoryId: number) => void;
	onClick?: (categoryId: number) => void;
}

const Categories: FC<CategoriesProps> = ({onClick, category, activeCategories, toggleActive}) => {
	return (
		<div
			key={category.id}
			className={`category ${activeCategories && activeCategories.includes(category.id) && 'active'}`}
			style={{
				backgroundColor: coloredTags(category?.parent_id),
				border: `1px solid ${coloredTags(category?.parent_id)}`,
			}}
			onClick={() => {
				toggleActive && toggleActive(category.id)
				onClick && onClick(category.id)
			}}
		>
			{category.name}
		</div>
	);
};

export default Categories;