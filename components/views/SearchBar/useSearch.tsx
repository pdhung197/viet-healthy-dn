import React, { useCallback, useContext, useState } from "react";
import { UserContext } from "../../../contexts/userContext/userContext";
import { debounce } from "../../../helpers/common";
import { ProductInfo } from "../../../models/Product";

export type SearchItemType = {
  label: string;
  image?: string;
  url: string;
};

export const useSearch = () => {
  const [searchList, setSearchList] = useState<SearchItemType[]>(
    [] as SearchItemType[]
  );
  const { productsList } = useContext(UserContext);

  const debounceSearch = useCallback(
    debounce((searchString: string) => {
      if (!searchString || searchString === "") {
        return setSearchList([] as SearchItemType[]);
      }

      const list: SearchItemType[] = productsList.reduce(
        (listItems: SearchItemType[], product: ProductInfo) => {
          const { name, images, slug } = product;
          if (name.toLowerCase().includes(searchString.toLowerCase())) {
            const item: SearchItemType = {
              label: name,
              url: `/products/${slug}`,
            };

            if (
              !(
                !images ||
                !images.length ||
                !images[0] ||
                images[0].src.includes("woocommerce-placeholder")
              )
            ) {
              const imgSrcs = images[0].src.split(".");

              item.image = `${imgSrcs
                .slice(0, imgSrcs.length - 1)
                .join(".")}-200x200.${imgSrcs[imgSrcs.length - 1]}`;
            }

            listItems.push(item);
          }

          return listItems;
        },
        []
      );

      setSearchList(list);
    }),
    []
  );

  const onSearch = (value: string) => {
    debounceSearch(value);
  };

  const onChange = (searchString: string) => {
    debounceSearch(searchString);
  };
  return {
    searchList,
    onSearch,
    onChange,
  };
};
