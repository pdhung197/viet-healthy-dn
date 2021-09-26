import { CartColumnKey } from "../../../models/Cart";
import { BenefitKeys } from "../../../models/PageProps";

export const pageData = {
  product: {
    total: "Tổng",
    preOrderAvai: "Có thể đặt trước",
    addToCart: "Thêm",
    pay: "Thanh toán",
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
  cart: {
    steps: {
      cart: {
        title: "Đơn hàng",
        describe: "Thông tin đơn hàng",
      },
      payment: {
        title: "Thông tin thanh toán",
        describe: "Thông tin thanh toán",
        customerInfo: "Thông tin khách hàng",
        paymentMethod: "Hình thức thanh toán",
      },
      finish: {
        title: "Hoàn thành",
        describe: "Hoàn tất đặt hàng",
      },
    },
    remove: "Xóa",
    removeQuestion: {
      product: "Bạn muốn xóa {{product}} khỏi giỏ hàng?",
      all: "Bạn muốn xóa toàn bộ giỏ hàng?",
    },
    removeBtns: {
      ok: "Đồng ý",
      cancel: "Hủy",
    },
    tableColumn: {
      [CartColumnKey.name]: "Sản phẩm",
      [CartColumnKey.price]: "Đơn giá",
      [CartColumnKey.quantity]: "Số lượng",
    },
    tempPrice: "Tạm tính",
    order: "Đặt hàng",
    customerForm: {
      fields: {
        name: "Họ và tên",
        email: "Email",
        phone: "Số điện thoại",
        province: "Tỉnh/Thành phố",
        district: "Quận/Huyện",
        ward: "Xã/Phường",
        address: "Địa chỉ nhận hàng",
        note: "Ghi chú",
      },
      placeholder: {
        name: "Nhập họ và tên",
        email: "Email thông báo",
        phone: "Số điện thoại liên lạc",
        province: "Chọn tỉnh/thành phố",
        district: "Chọn quận/huyện",
        ward: "Chọn xã/phường",
        address: "Số nhà, tên đường",
        note: "Ghi chú",
      },
      submit: "Hoàn tất đặt hàng",
      paymethod: {
        bank: {
          title: "Chuyển khoản ngân hàng",
          accountName: "Tên tài khoản",
          account: "Số tài khoản",
        },
        cod: {
          title: "Thanh toán khi nhận hàng",
          content: "Quý khách vui lòng thanh toán khi nhận hàng.",
        },
      },
    },
    finishedForm: {
      finish: "Cám ơn quý khách đã mua hàng tại Việt Healthy Đà Nẵng.",
      callback:
        "Nhân viên Việt Healthy Đà Nẵng sẽ liên lạc để xác nhận đơn hàng trong thời gian sớm nhất.",
      phone:
        "Mọi thắc mắc, vui lòng gọi <a href='tel:0938711074'>0938 711 074</a> hoặc Zalo <a target='_blank' href='http://zalo.me/0938711074'>VietHealthy Đà Nẵng - Đại lý chính thức</a>",
    },
  },
};
