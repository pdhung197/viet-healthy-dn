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
    key: "health",
    label: {
      en: "For Health",
      vi: "Sức khỏe",
    },
  },
  {
    id: 2,
    key: "household-article",
    label: {
      en: "Household Article",
      vi: "Gia Dụng",
    },
  },
  {
    id: 3,
    key: "foodstuffs",
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
    key: "detox-tour",
    label: {
      en: "Detox Tour",
      vi: "Tour thải độc",
    },
  },
  {
    id: 6,
    key: "other",
    label: {
      en: "Other",
      vi: "Khác",
    },
  },
];
