import React, { useState, useEffect } from "react";
import moment from "moment";
import { useSearchParams } from "react-router-dom";

const ManageOrder = () => {
  const [orders, setOrders] = useState([]);
  const [params] = useSearchParams();

  // Tạo một mảng sản phẩm mẫu
  const sampleProducts = [
    {
      id: 1,
      title: "Iphone 15 promax",
      quantity: 1,
      price: 1400, // Giá của mỗi sản phẩm
      thumbnail:
        "https://cdn.trangthienlong.com.vn/wp-content/uploads/2023/09/iphone-15-mau-hong-128gb-256gb-512gb-trang-thien-long-mobile-768x768.jpg",
      status: "Completed",
      createdAt: "2023-11-01T10:30:00",
    },
    {
      id: 2,
      title: "Acer Nitro 5",
      quantity: 1,
      price: 900,
      thumbnail:
        "https://gamalaptop.vn/wp-content/uploads/2021/09/Acer-Nitro-5-2020-i5-10300H-GTX-1650-01.jpg",
      status: "Completed",
      createdAt: "2023-11-02T15:45:00",
    },
    {
      id: 3,
      title: "Samsung Galaxy S22",
      quantity: 2,
      price: 1200,
      thumbnail:
        "https://images.samsung.com/is/image/samsung/p6pim/vn/2202/gallery/vn-galaxy-s22-s901-sm-s901eidgxxv-530762309?$650_519_PNG$",
      status: "Completed",
      createdAt: "2023-11-03T12:00:00",
    },
    {
      id: 4,
      title: "Magic Mouse",
      quantity: 2,
      price: 500,
      thumbnail:
        "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/MK2E3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1626468075000",
      status: "Completed",
      createdAt: "2023-11-03T12:00:00",
    },
    {
      id: 5,
      title: "Airpod 2",
      quantity: 1,
      price: 100,
      thumbnail:
        "https://cdn.tgdd.vn/Products/Images/54/236016/bluetooth-airpods-2-apple-mv7n2-imei-1-org.jpg",
      status: "Completed",
      createdAt: "2023-11-03T12:00:00",
    },
    {
      id: 6,
      title: "Ava earphone",
      quantity: 2,
      price: 500,
      thumbnail:
        "https://cdn.tgdd.vn/Products/Images/54/310644/tai-nghe-co-day-ava-livebass-y232-thumb-600x600.jpg",
      status: "Completed",
      createdAt: "2023-11-03T12:00:00",
    },
    {
      id: 7,
      title: "Magic Mouse",
      quantity: 2,
      price: 500,
      thumbnail:
        "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/MK2E3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1626468075000",
      status: "Completed",
      createdAt: "2023-11-04T12:00:00",
    },
    {
      id: 8,
      title: "Iphone 13",
      quantity: 1,
      price: 575,
      thumbnail:
        "https://cdn.hoanghamobile.com/i/preview/Uploads/2021/09/15/image-removebg-preview-12.png",
      status: "Completed",
      createdAt: "2023-11-06T12:00:00",
    },
    {
      id: 9,
      title: "Samsung ultra",
      quantity: 1,
      price: 400,
      thumbnail:
        "https://images.samsung.com/is/image/samsung/p6pim/uk/2302/feature/uk-feature-galaxy-s23-s918-535093922?$FB_TYPE_I_JPG$",
      status: "Completed",
      createdAt: "2023-11-07T12:00:00",
    },
    {
      id: 10,
      title: "Samsung ultra",
      quantity: 1,
      price: 400,
      thumbnail:
        "https://images.samsung.com/is/image/samsung/p6pim/uk/2302/feature/uk-feature-galaxy-s23-s918-535093922?$FB_TYPE_I_JPG$",
      status: "Completed",
      createdAt: "2023-11-08T12:00:00",
    },
    {
      id: 11,
      title: "Magic Mouse",
      quantity: 1,
      price: 500,
      thumbnail:
        "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/MK2E3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1626468075000",
      status: "Completed",
      createdAt: "2023-11-09T12:00:00",
    },
    {
      id: 12,
      title: "Iphone 15 promax",
      quantity: 1,
      price: 1400, // Giá của mỗi sản phẩm
      thumbnail:
        "https://cdn.trangthienlong.com.vn/wp-content/uploads/2023/09/iphone-15-mau-hong-128gb-256gb-512gb-trang-thien-long-mobile-768x768.jpg",
      status: "Completed",
      createdAt: "2023-11-11T10:30:00",
    },
    {
      id: 13,
      title: "Ipad 9 Wifi 2021 64GB",
      quantity: 1,
      price: 160, // Giá của mỗi sản phẩm
      thumbnail:
        "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQsBBLsrNE7PUMGdH6b5eGvDWWOfvcoLEGygCxAE2OsZlFHqCMwiQ02luBRZOsdSKGQXPclIt5ngXqkXwLDz-47V3dobsWMd2KnVHSCpSI-Yp0TURKNocqB&usqp=CAE",
      status: "Completed",
      createdAt: "2023-11-12T10:30:00",
    },
    {
      id: 14,
      title: "Samsung Galaxy S23 Ultra 256GB",
      quantity: 1,
      price: 1200, // Giá của mỗi sản phẩm
      thumbnail:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-galaxy-s23-ultra.png",
      status: "Completed",
      createdAt: "2023-11-13T10:30:00",
    },
    {
      id: 15,
      title: "Iphone 15 promax",
      quantity: 1,
      price: 1400, // Giá của mỗi sản phẩm
      thumbnail:
        "https://cdn.trangthienlong.com.vn/wp-content/uploads/2023/09/iphone-15-mau-hong-128gb-256gb-512gb-trang-thien-long-mobile-768x768.jpg",
      status: "Completed",
      createdAt: "2023-11-14T10:30:00",
    },
    {
      id: 16,
      title: "Apple MacBook Air M1 256GB 2020 I Chính hãng Apple Việt Nam",
      quantity: 1,
      price: 980, // Giá của mỗi sản phẩm
      thumbnail:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/a/i/air_m2.png",
      status: "Completed",
      createdAt: "2023-11-14T10:30:00",
    },
    {
      id: 17,
      title: "Màn hình MSI Pro MP243X 24 inch",
      quantity: 1,
      price: 98, // Giá của mỗi sản phẩm
      thumbnail:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/m/a/man-hinh-msi-pro-mp243x-24-inch_1.png",
      status: "Completed",
      createdAt: "2023-11-15T10:30:00",
    },
    {
      id: 18,
      title: "Tai nghe Bluetooth chụp tai JBL Tune 510BT",
      quantity: 1,
      price: 55, // Giá của mỗi sản phẩm
      thumbnail:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/t/a/tai-nghe-chup-tai-jbl-tune-510bt.png",
      status: "Completed",
      createdAt: "2023-11-16T10:30:00",
    },
    {
      id: 19,
      title: "Ava earphone",
      quantity: 1,
      price: 5,
      thumbnail:
        "https://cdn.tgdd.vn/Products/Images/54/310644/tai-nghe-co-day-ava-livebass-y232-thumb-600x600.jpg",
      status: "Completed",
      createdAt: "2023-11-17T12:00:00",
    },
    {
      id: 20,
      title: "Acer Nitro 5",
      quantity: 1,
      price: 900,
      thumbnail:
        "https://gamalaptop.vn/wp-content/uploads/2021/09/Acer-Nitro-5-2020-i5-10300H-GTX-1650-01.jpg",
      status: "Completed",
      createdAt: "2023-11-20T15:45:00",
    },
    {
      id: 21,
      title: "Màn hình MSI Pro MP243X 24 inch",
      quantity: 1,
      price: 98, // Giá của mỗi sản phẩm
      thumbnail:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/m/a/man-hinh-msi-pro-mp243x-24-inch_1.png",
      status: "Completed",
      createdAt: "2023-11-21T10:30:00",
    },
    {
      id: 22,
      title: "Microphone Saramonic Blink 100 B4 iOS",
      quantity: 1,
      price: 45, // Giá của mỗi sản phẩm
      thumbnail:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/m/i/microphone-saramonic-blink-100-b4-ios_5_.png",
      status: "Completed",
      createdAt: "2023-11-22T10:30:00",
    },
    {
      id: 23,
      title: "Ava earphone",
      quantity: 1,
      price: 5,
      thumbnail:
        "https://cdn.tgdd.vn/Products/Images/54/310644/tai-nghe-co-day-ava-livebass-y232-thumb-600x600.jpg",
      status: "Completed",
      createdAt: "2023-11-23T12:00:00",
    },
    {
      id: 24,
      title: "Ipad 9 Wifi 2021 64GB",
      quantity: 1,
      price: 160, // Giá của mỗi sản phẩm
      thumbnail:
        "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQsBBLsrNE7PUMGdH6b5eGvDWWOfvcoLEGygCxAE2OsZlFHqCMwiQ02luBRZOsdSKGQXPclIt5ngXqkXwLDz-47V3dobsWMd2KnVHSCpSI-Yp0TURKNocqB&usqp=CAE",
      status: "Completed",
      createdAt: "2023-11-24T10:30:00",
    },
    {
      id: 25,
      title: "Ava earphone",
      quantity: 1,
      price: 5,
      thumbnail:
        "https://cdn.tgdd.vn/Products/Images/54/310644/tai-nghe-co-day-ava-livebass-y232-thumb-600x600.jpg",
      status: "Completed",
      createdAt: "2023-11-24T12:00:00",
    },
    {
      id: 26,
      title: "Magic Mouse",
      quantity: 1,
      price: 500,
      thumbnail:
        "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/MK2E3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1626468075000",
      status: "Completed",
      createdAt: "2023-11-25T12:00:00",
    },
    // Thêm sản phẩm khác nếu cần
  ];

  useEffect(() => {
    // Gán giá trị cho orders từ mảng sản phẩm mẫu
    setOrders(
      sampleProducts.map((product) => ({
        ...product,
        total: calculateTotal(product.price, product.quantity),
      }))
    );
  }, []);

  // Tính tổng doanh thu
  const totalRevenue = orders.reduce((total, order) => total + order.total, 0);

  // Hàm tính total
  const calculateTotal = (price, quantity) => {
    return price * quantity;
  };

  return (
    <div>
      <table className="table-auto w-full">
        <thead>
          <tr className="border bg-sky-900 text-white border-white">
            <th className="text-center py-2">#</th>
            <th className="text-center py-2">Products</th>
            <th className="text-center py-2">Quantity</th>
            <th className="text-center py-2">Price</th>
            <th className="text-center py-2">Total</th>
            <th className="text-center py-2">Status</th>
            <th className="text-center py-2">CreatedAt</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((el, idx) => (
            <tr className="border-b" key={el.id}>
              <td className="text-center max-w-[500px] py-2">
                {(+params.get("page") > 1 ? +params.get("page") - 1 : 0) *
                  process.env.REACT_APP_LIMIT +
                  idx +
                  1}
              </td>
              <td className="text-center py-2">
                <div className="max-w-xs overflow-hidden">
                  <span className="flex gap-2 items-center" key={el.id}>
                    <img
                      src={el.thumbnail}
                      alt="thumb"
                      className="w-8 h-8 rounded-md object-cover"
                    />
                    <span className="flex flex-col">
                      <span className="text-main text-sm">{el.title}</span>
                      <span className="flex items-center text-xs">
                        <span>Quantity:</span>
                        <span className="text-main">{el.quantity}</span>
                      </span>
                    </span>
                  </span>
                </div>
              </td>
              <td className="text-center py-2">{el.quantity}</td>
              <td className="text-center py-2">{el.price + ` $`}</td>
              <td className="text-center py-2">{el.total + ` $`}</td>
              <td className="text-center py-2">{el.status}</td>
              <td className="text-center py-2">
                {moment(el.createdAt).format("DD/MM/YYYY")}
              </td>
              <td className="text-center py-2">
                {/* Bổ sung nút hoặc tương tác khác nếu cần */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Hiển thị tổng doanh thu */}
      <div className="mt-4">
        <h3 className="text-lg font-bold">
          Total Revenue: {totalRevenue.toFixed(2)} $
        </h3>
      </div>
    </div>
  );
};

export default ManageOrder;
