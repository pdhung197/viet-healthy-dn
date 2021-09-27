import { CartColumnKey } from "../../../models/Cart";

export const pageData = {
  product: {
    total: "Total",
    preOrderAvai: "Pre-order Opens",
    addToCart: "Add",
    pay: "Payment",
    price: "Price",
    quantity: "Quantity",
    relates: "Relate products",
  },
  cart: {
    steps: {
      cart: {
        title: "Carts",
        describe: "Carts information",
      },
      payment: {
        title: "Info and payment",
        describe: "Customer info and Payment",
        customerInfo: "Customer info",
        paymentMethod: "Payment method",
      },
      finish: {
        title: "Finish",
      },
    },
    remove: "Delete",
    removeQuestion: {
      product: "Do you want to remove {{product}} from cart?",
      all: "Do you want to clear the cart?",
    },
    removeBtns: {
      ok: "OK",
      cancel: "Cancel",
    },
    tableColumn: {
      [CartColumnKey.name]: "Product",
      [CartColumnKey.price]: "Price",
      [CartColumnKey.quantity]: "Quantity",
    },
    tempPrice: "Total",
    order: "Order",
    customerForm: {
      fields: {
        name: "Full name",
        email: "Email",
        phone: "Phone number",
        province: "Province",
        district: "District",
        ward: "Ward",
        address: "Delivery address",
        note: "Note",
      },
      placeholder: {
        name: "Full name",
        email: "Email addess",
        phone: "Phone number for contact",
        province: "Choose provice",
        district: "Choose district",
        ward: "Choose ward",
        address: "Address and street",
        note: "Note",
      },
      submit: "Order",
      paymethod: {
        bank: {
          title: "Direct bank transfer",
          accountName: "Account name",
          account: "Account number",
        },
        cod: {
          title: "Cash on delivery",
          content: "Please cash on delivery.",
        },
      },
    },
    finishedForm: {
      finish: "Thank you for shopping at Viet Healthy Danang.",
      callback:
        "Viet Healthy Danang staff will contact to confirm the order as soon as possible.",
      yourOrder: "Your order number is",
      phone:
        "Any questions, please call <a href='tel:0938711074'>0938 711 074</a> or Zalo <a target='_blank' href='http://zalo.me/0938711074'>VietHealthy Đà Nẵng - Đại lý chính thức</a>",
    },
  },
};
