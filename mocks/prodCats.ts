export type ProdCatType = {
  id: string | number;
  key: string;
  label: {
    [key in string]: string;
  };
};

export const prodCats: ProdCatType[] = [
  {
    id: 1,
    key: "suc-khoe",
    label: {
      en: "For Health",
      vi: "Sức khỏe",
    },
  },
  {
    id: 2,
    key: "gia-dung",
    label: {
      en: "Household Article",
      vi: "Gia Dụng",
    },
  },
  {
    id: 3,
    key: "thuc-pham",
    label: {
      en: "Foodstuffs",
      vi: "Thực phẩm",
    },
  },
  {
    id: 4,
    key: "healthy-drink",
    label: {
      en: "Healthy drink",
      vi: "Healthy drink",
    },
  },
  {
    id: 5,
    key: "tour-thai-doc",
    label: {
      en: "Detox Tour",
      vi: "Tour thải độc",
    },
  },
  {
    id: 6,
    key: "kien-thuc",
    label: {
      en: "Book",
      vi: "Kiến thức",
    },
  },
  {
    id: 7,
    key: "zkhac",
    label: {
      en: "Other",
      vi: "Khác",
    },
  },
];
