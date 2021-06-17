import {axiosClient} from "./../../utils/axiosClient";
import {CategoryInfo, CategoryParams} from "./../../models/Category";

export const categoryApiUrl = "/products/categories";

export const fetchCategoryList = async (
  params: CategoryParams = {}
): Promise<CategoryInfo[]> => {
  const categoryList = await axiosClient({
    url: categoryApiUrl,
    params,
  });

  if (categoryList && categoryList.length) {
    return categoryList
      .filter((category: CategoryInfo) => category.slug !== "uncategorized")
      .sort((categoryA: CategoryInfo, categoryB: CategoryInfo) => {
        return categoryA.menu_order > categoryB.menu_order
          ? 1
          : categoryB.menu_order > categoryA.menu_order
          ? -1
          : 0;
      });
  }

  return categoryList;
};
