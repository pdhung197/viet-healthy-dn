export const calPrice = (price: number, discount = 0) => {
  return (price * (100 - discount)) / 100;
};
