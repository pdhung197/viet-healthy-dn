import {Modal} from "antd";

export const confirmRemove = (productName?: "all" | string | number) => {
  return Modal.error({
    title: "Bạn muốn xóa sản phẩm này?",
  });
};
