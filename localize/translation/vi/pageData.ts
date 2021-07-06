import {BenefitKeys} from "../../../models/PageProps";

export const pageData = {
  product: {
    total: "Tổng",
    preOrderAvai: "Có thể đặt trước",
    addToCart: "Thêm",
    price: "Giá",
    quantity: "Số lượng",
    relates: "Sản phẩm liên quan",
  },
  homePage: {
    benefits: {
      [BenefitKeys.freeShip]: {
        title: "Miễn phí giao hàng",
        describe1: "Nội thành: Đơn hàng >500K",
        describe2: "Ngoại thành: Đơn hàng >2 triệu",
      },
      [BenefitKeys.quality]: {
        title: "Chất lượng hàng đầu",
        describe1: "100% hàng chính hãng",
      },
      [BenefitKeys.save]: {
        title: "Cam kết giá tốt",
        describe1: "Cam kết giá tốt nhất thị trường",
      },
      [BenefitKeys.support]: {
        title: "Hỗ trợ đa kênh",
        describe1: "Zalo, Messenger, Phone",
        describe2:
          "<a href='tel:0938711074'>0938 711 074</a> | <a href='tel:0934763123'>0934 763 123</a> ",
      },
    },
    seeMore: "Xem thêm",
    features: {
      title: "Sản phẩm nổi bật",
    },
  },
};
