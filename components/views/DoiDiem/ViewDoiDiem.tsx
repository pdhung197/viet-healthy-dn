import React, { useState } from "react";
import { Button, Input, Modal, Radio, Space, Spin } from "antd";
import { VHHead } from "../../blocks/Head/VHHead";
import "./doidiem.scss";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { CustomerScoreData } from "../../../models/Customer";
import { ExclamationCircleOutlined, LoadingOutlined } from "@ant-design/icons";
import { GoogleSpreadsheet, GoogleSpreadsheetRow } from "google-spreadsheet";
import { RadioChangeEvent } from "antd/lib/radio";
import Link from "next/link";

const { confirm } = Modal;
const endDate = new Date("2023-02-13");

const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;
const antIconSmall = <LoadingOutlined style={{ fontSize: 18 }} spin />;
const directCoupon = "DIRECT";
const getPercentageCoupon = (score: number) => {
  const date = new Date("2023/02/02");
  const coefficient =
    Math.floor(score / 50) + 1 > 6 ? 6 : Math.floor(score / 50) + 1;

  return {
    couponCode: `PER${coefficient}M`,
    expiredDate: new Date(date.setMonth(date.getMonth() + coefficient)),
  };
};
const getCoupontDecide = (coupon: string, score: number) => {
  if (coupon === "DIRECT") {
    return `giảm ${score}.000 đồng vào 01 đơn hàng kế tiếp phát sinh trước ngày 12/02/2023`;
  }

  const { expiredDate } = getPercentageCoupon(score);

  return `giảm 5% cho tất cả các đơn hàng từ 02/02/2023 đến ${
    expiredDate.getDate() < 10 ? "0" : ""
  }${expiredDate.getDate()}/${expiredDate.getMonth() < 9 ? "0" : ""}${
    expiredDate.getMonth() + 1
  }/${expiredDate.getFullYear()}`;
};

export const ViewDoiDiem = ({ current }: { current: string }) => {
  const { t } = useTranslation();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState("");
  const [userInfo, setUserInfo] = useState<CustomerScoreData>(
    {} as unknown as CustomerScoreData
  );
  const [customerIndex, setCustomerIndex] = useState(-1);

  const SPREADSHEET_ID = "1sM-CsRKDKoYjQzYoY1jdy_6n5iDrOhHJFJSHry9KAvw";
  const CLIENT_EMAIL = "vhtchangescore@vhtchangescore.iam.gserviceaccount.com";
  const PRIVATE_KEY = `-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDNzs5idSLRkOy7\nddPYCdX5RGk4IUJGTgg0hcSAqz47UeQhQkO1ltybZzHN39YgBfclWXW6dqvBbaNY\nBWaEPyWU9EJps967xyLtDJf1u2qzZmQa0plqnZOfEGXOLr1xmapuU//l9cOFmY9Z\nGvbkIduY/4ufs0Yk3tfBJXU9Z4YDuWVNXrEUOEhkyFWBO6QkV6JmH7B80ECGugCu\nRoSXJDv6M5dJ/uCaPGBU+8/IwjHfjt8kyLwbXjUH2AwgvpvDinXOTQRjR0v8uvyR\nv0tAO34i09QD55/yN0Ld9W81TBIPPaFi2Y24srGGIhevrAsXGzMDOin2jC5EojVB\nod93y09zAgMBAAECggEANQZETD+rsdyp8X5hDzcxhuBmT4zaG2z9VjLkttXn2ba2\nlQ8SjNWKjwteXJGABI4k592NpHXwuIw72nDBwe7XCvKHrd4m07BxwitNd4VK71/B\nCNwbpMlmgEPkRuPp8TvLGlPQCXpxXpl6wlVdKNfEUT39xi6VMuirI9s3wpNKhuil\n5dGjus6+qPGhUKjqCuGNh5X+nU7EBaQ/2ejFlCHHD8t5YuIkWOwxSIQQouDDzjAG\nk4Kcw3b/ZqqTgms7Ke5gcKQYXzVCcoV7ESIOHeJBnoMn/XQg4KSzgBnG27Z6zbUv\nG7uyiIt5R533HzS5XMmYJ2W3A2KpnObzXu2pS4qrEQKBgQDtYRDQG4eOY13oP8iI\nSHllDycLUQ4wN5RaPbO+WbPO8JBm7cd8Y7P0VigRC2tlblj4s0Zq0ekHvGcNLJTu\nbFMrDBE/vobQAjyLJcLgKTnyKxhcdcDMSUaDR3qgkzzoTNDJqkMSKuQJQpYT12fA\nASVpq7iu1ZazD7tIxgM0LCq4CQKBgQDd872E2BYO5hsNkVi/aGe3ghEwPeKj+ZJ0\nuSBULq6GJsEdX2wuDjnKsqarABartaLt5Qk0SDP0ZivXmEnqor3ngxQDyUA9Rjnj\nttX+3msINB+dkh9FetsvzNwB5sP4ULrpUx2Yy+xgUlsbvI3ZBNfzJFKr6qP9JXWO\n1TU7w+NSmwKBgFdFHkdEN7vzcCzYdkMUUf0DaxlP/WVgqZvbn19V3zMvYgdVV8e1\naA1mN2i8yAkMXo1ga30OGxwK+d/wCfj1vkXPM/A5fZqvl86YXWLIBVOw4E3txKnW\nLqRI/R5Xw0asJv5dKDdfqWJ2JnK4+J2wTi7hQQ6V28eM+w+wLLFbo4DxAoGBAL/R\nScYIdi/UICc+qSNrGM/YogA+S6QJKdCkudLnMT+ROK6o7DZ1Zu7OLQp2HiGx7aiJ\nm8XKbNRYhKVj4OXeVh9CAkcvY8xQ5/Dr78+/62KAoZ4tTcdfYRTTiIRAKrdtFcxW\nX6rQ+m1YX5L+Bt06uWNRzfzz4VwDRrD1hHctWUXnAoGAZMSpN2jm9aLrja8NROne\nbLJr8y8AiCK2pls8I/HrLPhhWbfnKOlqo5amoSIniefNZAgEq2NIJh0eOOnFufQv\nl4dGqwjsbOv0Ft4I72ge4WHvfZYqhoXBVKlIlZGVApINAGf0VGdhafJtWsL8+eMi\nb740SAdnTBvnO6qDDkkJoEI=\n-----END PRIVATE KEY-----\n`;

  const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

  const handleResetSearch = () => {
    setCustomerIndex(-1);
    setUserInfo({} as unknown as CustomerScoreData);
  };

  const handleSubmitCoupon = async () => {
    if (customerIndex < 0 || !userInfo.phone || !selectedCoupon) {
      return;
    }
    setIsSearching(true);
    await doc.useServiceAccountAuth({
      client_email: CLIENT_EMAIL,
      private_key: PRIVATE_KEY,
    });
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows({ limit: 2000, offset: 0 });
    rows[customerIndex]["Coupon"] = selectedCoupon;
    await rows[customerIndex].save();

    handleGetCustomer();
    setPhoneNumber("");
    try {
    } catch (error) {
      console.log({ error });
      setIsSearching(false);
    }
  };

  const handleClickSubmit = () => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      className: "score__modal",
      content: (
        <p>
          Anh chị chắc chắn chọn phương án đổi {totalScore} điểm để{" "}
          {getCoupontDecide(selectedCoupon, parseInt(totalScore))}?
        </p>
      ),
      onOk() {
        handleSubmitCoupon();
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const handleSelectCoupon = (e: RadioChangeEvent) => {
    setSelectedCoupon(e.target.value);
  };

  const handleGetCustomer = async () => {
    setIsSearching(true);
    const phone = phoneNumber.replace(/\D/g, "");
    if (!phone || !phone.length) {
      return setIsSearching(false);
    }

    await doc.useServiceAccountAuth({
      client_email: CLIENT_EMAIL,
      private_key: PRIVATE_KEY,
    });
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows({ limit: 2000, offset: 0 });

    const customerRowIndex = rows.findIndex((row) => row["Phone"] === phone);

    if (customerRowIndex > -1) {
      const customerRow = rows[customerRowIndex];
      const foundUserInfo = {
        index: customerRow["Index"],
        name: customerRow["CustomerName"],
        phone: customerRow["Phone"],
        location: customerRow["Location"],
        totalBuy: customerRow["TotalBuy"],
        totalOrder: customerRow["TotalOrder"],
        lastOrder: customerRow["LastOrder"],
        totalScore: customerRow["TotalScore"],
        coupon: customerRow["Coupon"],
        customerType: customerRow["Type"],
      };

      setUserInfo(foundUserInfo);
      setSelectedCoupon(foundUserInfo.coupon);
      setCustomerIndex(customerRowIndex);
    }
    return setIsSearching(false);
  };

  const handleSearchCustomer = () => {
    handleResetSearch();
    handleGetCustomer();
  };

  const { name, totalScore, coupon, customerType } = userInfo;
  const { couponCode, expiredDate } = getPercentageCoupon(parseInt(totalScore));

  const isOverDate = new Date(current).getTime() > endDate.getTime();

  return (
    <>
      <VHHead title="Chương trình đổi điểm" />
      <div className="score">
        <div className="score__instruction">
          <h3>{t("pageData.doidiem.title")}</h3>
          <p>
            Chương trình đổi điểm Tri ân khách hàng Đại lý VietHealthy tại Đà
            Nẵng.
          </p>
          <p>
            <strong>*** XIN LƯU Ý ***</strong>
          </p>
          <ul>
            <li>Chương trình không áp dụng đối với Cộng tác viên và Đại lý.</li>
            <li>
              Quý khách sẽ có thể đổi điểm đến hết ngày 12/02/2023. Sau thời
              gian trên, chương trình sẽ kết thúc.
            </li>
          </ul>
        </div>
        <div className="score__search">
          <Input
            placeholder={t("pageData.doidiem.searchPlaceholder")}
            value={phoneNumber}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPhoneNumber(e.target.value)
            }
            size="large"
            className="score__search__input"
          />
          <Button
            className="score__search__btn"
            onClick={handleSearchCustomer}
            type="primary"
            disabled={!phoneNumber}
          >
            {t("pageData.doidiem.search")}
          </Button>

          {isOverDate && (
            <>
              <p className="score__over">
                Chương trình đổi điểm năm 2022 của Đại lý Việt Healthy tại Đà
                Nẵng đã kết thúc!
              </p>
              <div className="score__result__finish">
                <p>
                  Quý khách vui lòng truy cập vào{" "}
                  <Link href="/products">
                    <a>Sản phẩm</a>
                  </Link>{" "}
                  để đặt hàng và tích lũy điểm cho năm 2023. Xin cám ơn.
                </p>
              </div>
            </>
          )}
        </div>
        <div className={`score__result ${userInfo.phone ? "found" : ""}`}>
          {isSearching && (
            <div className="score__result__loading">
              <Spin indicator={antIcon} />
              <p>Vui lòng đợi</p>
            </div>
          )}
          {userInfo.index && (
            <>
              <p className="score__result__say-hi">
                Xin chào <span>{name.toUpperCase()}</span>
                {customerType === "KHACH" && (
                  <>
                    , số điểm tích lũy của anh/chị trong năm 2022 (tính đến ngày
                    02/02/2023) là <strong>{totalScore}</strong> điểm.
                  </>
                )}
              </p>
              {customerType !== "KHACH" && (
                <p className="score__result__say-hi">
                  Cám ơn anh/chị đã đồng hành cùng VietHealhy Đà Nẵng, chương
                  trình không áp dụng cho Đại lý và CTV
                </p>
              )}
              {customerType === "KHACH" && parseInt(totalScore) > 0 && (
                <>
                  {!!coupon ? (
                    <p className="score__result__question">
                      Anh/chị đã chọn hình thức đổi điểm:
                    </p>
                  ) : isOverDate ? (
                    <p>Các hình thức đổi điểm đang được áp dụng:</p>
                  ) : (
                    <p>Anh/chị vui lòng chọn hình thức đổi điểm:</p>
                  )}
                  <Radio.Group
                    onChange={handleSelectCoupon}
                    value={selectedCoupon}
                    disabled={!!coupon || isOverDate}
                    className="score__result__radios"
                  >
                    <Space direction="vertical">
                      <Radio value={directCoupon}>
                        Giảm {totalScore}.000 đồng vào 01 đơn hàng kế tiếp phát
                        sinh từ ngày 02/02/2023 đến 12/02/2023.
                      </Radio>
                      <Radio value={couponCode}>
                        Giảm 5% cho tất cả các đơn hàng từ 02/02/2023 đến{" "}
                        {expiredDate.getDate() < 10 && "0"}
                        {expiredDate.getDate()}/
                        {expiredDate.getMonth() < 9 && "0"}
                        {expiredDate.getMonth() + 1}/{expiredDate.getFullYear()}
                      </Radio>
                    </Space>
                  </Radio.Group>

                  {!coupon && !isOverDate ? (
                    <div className="score__result__submit">
                      <Button
                        className="score__search__btn"
                        onClick={handleClickSubmit}
                        type="primary"
                        danger
                        disabled={
                          !userInfo.phone || !selectedCoupon || !!coupon
                        }
                      >
                        Xác nhận
                      </Button>
                    </div>
                  ) : (
                    <div className="score__result__finish">
                      <p>
                        Hãy truy cập vào{" "}
                        <Link href="/products">
                          <a>Sản phẩm</a>
                        </Link>{" "}
                        để đặt hàng và nhận những ưu đãi đã quy đổi.
                      </p>
                    </div>
                  )}
                </>
              )}
              {customerType === "KHACH" && parseInt(totalScore) <= 0 && (
                <div className="score__result__finish">
                  <p>
                    Hãy truy cập vào{" "}
                    <Link href="/products">
                      <a>Sản phẩm</a>
                    </Link>{" "}
                    để đặt hàng và tích lũy điểm cho năm 2023 nhé!!
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
