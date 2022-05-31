import { axiosClient } from "../../utils/axiosClient";

const vnMonthNames = [
  "Một",
  "Hai",
  "Ba",
  "Bốn",
  "Năm",
  "Sáu",
  "Bảy",
  "Tám",
  "Chín",
  "Mười",
  "Mười một",
  "Mười hai",
];

const buildMailBody = (order: any) => {
  const { number = 0, date_created, billing, shipping, line_items, total: orderTotal, payment_method_title } = order;
  const {
    first_name = "",
    last_name = "",
    address_1 = "",
    email = "",
    phone = "",
  } = billing;
  const {
    first_name: ship_first_name = "",
    last_name: ship_last_name = "",
    address_1: ship_address_1 = "",
  } = shipping;

  const dateLabel = `${new Date(date_created).getDate()} tháng ${
    vnMonthNames[new Date(date_created).getMonth()]
  }, ${new Date(date_created).getFullYear()}`;
  return `<!DOCTYPE html> 
    <html lang="vi">
       <head>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
          <title>Việt Healthy Đà Nẵng – Vì sức khỏe người Việt</title>
       </head>
       <body leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0" style="padding: 0;">
          <div id="wrapper" dir="ltr" style="background-color: #f7f7f7; margin: 0; padding: 70px 0; width: 100%; -webkit-text-size-adjust: none;" bgcolor="#f7f7f7" width="100%">
             <table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%">
                <tr>
                   <td align="center" valign="top">
                      <div id="template_header_image"> </div>
                      <table border="0" cellpadding="0" cellspacing="0" width="600" id="template_container" style="background-color: #fff; border: 1px solid #dedede; box-shadow: 0 1px 4px rgba(0,0,0,.1); border-radius: 3px;" bgcolor="#fff">
                         <tr>
                            <td align="center" valign="top">
                               <!-- Header --> 
                               <table border="0" cellpadding="0" cellspacing="0" width="100%" id="template_header" style='background-color: #056939; color: #fff; border-bottom: 0; font-weight: bold; line-height: 100%; vertical-align: middle; font-family: "Helvetica Neue",Helvetica,Roboto,Arial,sans-serif; border-radius: 3px 3px 0 0;' bgcolor="#056939">
                                  <tr>
                                     <td id="header_wrapper" style="padding: 36px 48px; display: block;">
                                        <h1 style='font-family: "Helvetica Neue",Helvetica,Roboto,Arial,sans-serif; font-size: 30px; font-weight: 300; line-height: 150%; margin: 0; text-align: left; text-shadow: 0 1px 0 #378761; color: #fff; background-color: inherit;' bgcolor="inherit">Đơn hàng mới #${number}</h1>
                                     </td>
                                  </tr>
                               </table>
                               <!-- End Header --> 
                            </td>
                         </tr>
                         <tr>
                            <td align="center" valign="top">
                               <!-- Body --> 
                               <table border="0" cellpadding="0" cellspacing="0" width="600" id="template_body">
                                  <tr>
                                     <td valign="top" id="body_content" style="background-color: #fff;" bgcolor="#fff">
                                        <!-- Content --> 
                                        <table border="0" cellpadding="20" cellspacing="0" width="100%">
                                           <tr>
                                              <td valign="top" style="padding: 48px 48px 32px;">
                                                 <div id="body_content_inner" style='color: #636363; font-family: "Helvetica Neue",Helvetica,Roboto,Arial,sans-serif; font-size: 14px; line-height: 150%; text-align: left;' align="left">
                                                    <p style="margin: 0 0 16px;">Bạn vừa nhận được đơn hàng từ ${last_name} ${first_name}. Đơn hàng như sau:</p>
                                                    <h2 style='color: #056939; display: block; font-family: "Helvetica Neue",Helvetica,Roboto,Arial,sans-serif; font-size: 18px; font-weight: bold; line-height: 130%; margin: 0 0 18px; text-align: left;'> <a class="link" href="https://pdhung.info/vht/wp-admin/post.php?post=${number}&action=edit" style="font-weight: normal; text-decoration: underline; color: #056939;">[Đơn hàng #${number}]</a> (${dateLabel})</h2>
                                                    <div style="margin-bottom: 40px;">
                                                       <table class="td" cellspacing="0" cellpadding="6" border="1" style="color: #636363; border: 1px solid #e5e5e5; vertical-align: middle; width: 100%; font-family: 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif;" width="100%">
                                                          <thead>
                                                             <tr>
                                                                <th class="td" scope="col" style="color: #636363; border: 1px solid #e5e5e5; vertical-align: middle; padding: 12px; text-align: left;" align="left">Sản phẩm</th>
                                                                <th class="td" scope="col" style="color: #636363; border: 1px solid #e5e5e5; vertical-align: middle; padding: 12px; text-align: left;" align="left">Số lượng</th>
                                                                <th class="td" scope="col" style="color: #636363; border: 1px solid #e5e5e5; vertical-align: middle; padding: 12px; text-align: left;" align="left">Giá</th>
                                                             </tr>
                                                          </thead>
                                                          <tbody>
                                                          ${(
                                                            line_items || []
                                                          ).map((item: any) => {
                                                              const { name, sku, quantity, total } = item;
                                                            return `<tr class="order_item">
                                                            <td class="td" style="color: #636363; border: 1px solid #e5e5e5; padding: 12px; text-align: left; vertical-align: middle; font-family: 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif; word-wrap: break-word;" align="left"> ${name} (#${sku}) </td>
                                                            <td class="td" style="color: #636363; border: 1px solid #e5e5e5; padding: 12px; text-align: left; vertical-align: middle; font-family: 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif;" align="left"> ${quantity} </td>
                                                            <td class="td" style="color: #636363; border: 1px solid #e5e5e5; padding: 12px; text-align: left; vertical-align: middle; font-family: 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif;" align="left"> <span class="woocommerce-Price-amount amount">${parseFloat(total).toLocaleString()}<span class="woocommerce-Price-currencySymbol">₫</span></span> </td>
                                                         </tr>`;
                                                          }).join('')}
                                                          </tbody>
                                                          <tfoot>
                                                             <tr>
                                                                <th class="td" scope="row" colspan="2" style="color: #636363; border: 1px solid #e5e5e5; vertical-align: middle; padding: 12px; text-align: left; border-top-width: 4px;" align="left">Tổng số phụ:</th>
                                                                <td class="td" style="color: #636363; border: 1px solid #e5e5e5; vertical-align: middle; padding: 12px; text-align: left; border-top-width: 4px;" align="left"><span class="woocommerce-Price-amount amount">${parseFloat(orderTotal).toLocaleString()}<span class="woocommerce-Price-currencySymbol">₫</span></span></td>
                                                             </tr>
                                                             <tr>
                                                                <th class="td" scope="row" colspan="2" style="color: #636363; border: 1px solid #e5e5e5; vertical-align: middle; padding: 12px; text-align: left;" align="left">Giao nhận hàng:</th>
                                                                <td class="td" style="color: #636363; border: 1px solid #e5e5e5; vertical-align: middle; padding: 12px; text-align: left;" align="left">Flat Rate</td>
                                                             </tr>
                                                             <tr>
                                                                <th class="td" scope="row" colspan="2" style="color: #636363; border: 1px solid #e5e5e5; vertical-align: middle; padding: 12px; text-align: left;" align="left">Phương thức thanh toán:</th>
                                                                <td class="td" style="color: #636363; border: 1px solid #e5e5e5; vertical-align: middle; padding: 12px; text-align: left;" align="left">${payment_method_title}</td>
                                                             </tr>
                                                             <tr>
                                                                <th class="td" scope="row" colspan="2" style="color: #636363; border: 1px solid #e5e5e5; vertical-align: middle; padding: 12px; text-align: left;" align="left">Tổng cộng:</th>
                                                                <td class="td" style="color: #636363; border: 1px solid #e5e5e5; vertical-align: middle; padding: 12px; text-align: left;" align="left"><span class="woocommerce-Price-amount amount">${parseFloat(orderTotal).toLocaleString()}<span class="woocommerce-Price-currencySymbol">₫</span></span></td>
                                                             </tr>
                                                          </tfoot>
                                                       </table>
                                                    </div>
                                                    <table id="addresses" cellspacing="0" cellpadding="0" border="0" style="width: 100%; vertical-align: top; margin-bottom: 40px; padding: 0;" width="100%">
                                                       <tr>
                                                          <td valign="top" width="50%" style="text-align: left; font-family: 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif; border: 0; padding: 0;" align="left">
                                                             <h2 style='color: #056939; display: block; font-family: "Helvetica Neue",Helvetica,Roboto,Arial,sans-serif; font-size: 18px; font-weight: bold; line-height: 130%; margin: 0 0 18px; text-align: left;'>Địa chỉ thanh toán</h2>
                                                             <address class="address" style="padding: 12px; color: #636363; border: 1px solid #e5e5e5;"> ${last_name} ${first_name}<br>${address_1}<br><a href="tel:${phone}" style="color: #056939; font-weight: normal; text-decoration: underline;">${phone}</a> <br>${email} </address>
                                                          </td>
                                                          <td valign="top" width="50%" style="text-align: left; font-family: 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif; padding: 0;" align="left">
                                                             <h2 style='color: #056939; display: block; font-family: "Helvetica Neue",Helvetica,Roboto,Arial,sans-serif; font-size: 18px; font-weight: bold; line-height: 130%; margin: 0 0 18px; text-align: left;'>Địa chỉ giao hàng</h2>
                                                             <address class="address" style="padding: 12px; color: #636363; border: 1px solid #e5e5e5;"> ${ship_last_name} ${ship_first_name}<br>${ship_address_1}</address>
                                                          </td>
                                                       </tr>
                                                    </table>
                                                    <p style="margin: 0 0 16px;">Congratulations on the sale.</p>
                                                 </div>
                                              </td>
                                           </tr>
                                        </table>
                                        <!-- End Content --> 
                                     </td>
                                  </tr>
                               </table>
                               <!-- End Body --> 
                            </td>
                         </tr>
                      </table>
                   </td>
                </tr>
                <tr>
                   <td align="center" valign="top">
                      <!-- Footer --> 
                      <table border="0" cellpadding="10" cellspacing="0" width="600" id="template_footer">
                         <tr>
                            <td valign="top" style="padding: 0; border-radius: 6px;">
                               <table border="0" cellpadding="10" cellspacing="0" width="100%">
                                  <tr>
                                     <td colspan="2" valign="middle" id="credit" style='border-radius: 6px; border: 0; color: #8a8a8a; font-family: "Helvetica Neue",Helvetica,Roboto,Arial,sans-serif; font-size: 12px; line-height: 150%; text-align: center; padding: 24px 0;' align="center"> </td>
                                  </tr>
                               </table>
                            </td>
                         </tr>
                      </table>
                      <!-- End Footer --> 
                   </td>
                </tr>
             </table>
          </div>
       </body>
    </html>`;
};

export const sendMailOrder = async (orderNumber: number, order: any): Promise<any> => {
  const url = process.env.NEXT_PUBLIC_API_MAILER;

  const mailBody = {
    email: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
    name: "New order",
    company: "Website Viet Healthy Danang",
    subject: `[Việt Healthy] Đơn hàng mới từ website #${orderNumber}`,
    message: buildMailBody(order),
  }

  return await axiosClient(
    {
      method: "post",
      url,
      data: mailBody,
    },
    true
  );
};
