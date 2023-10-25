import React, { useState, useEffect } from "react";
import styles from "./UserAdmin.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import axios from "axios";
import ProductForm from "./ProductModal.jsx";

const cx = classNames.bind(styles);

function ProductAdmin({
  currentPage,
  itemsPerPage,
  indexOfFirst,
  indexOfLast,
  setCurrentPage,
}) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const currentProduct = products.slice(indexOfFirst, indexOfLast);
  const pageNumbers = [];
  const totalPages = Math.ceil(products.length / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  useEffect(() => {
    // Thực hiện gọi API để lấy danh sách sản phẩm
    axios
      .get(`${process.env.REACT_APP_API_KEY}/api/product`)
      .then((response) => {
        setProducts(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching product data: ", error);
      });
  }, []);

  const handleDeleteProduct = (productId) => {
    axios
      .delete(`${process.env.REACT_APP_API_KEY}/api/product/${productId}`)
      .then((response) => {
        // Nếu xóa thành công, cập nhật danh sách sản phẩm
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId)
        );
      })
      .catch((error) => {
        console.error("Error deleting product: ", error);
      });
  };

  return (
    <article>
      <div className={cx("modal-title")}>
        <h2>Quản lý sản phẩm</h2>
        <button onClick={() => setIsAddModalOpen(true)}>+</button>
      </div>
      {isAddModalOpen && <ProductForm />}
      <div className={cx("modal-filter")}>
        <p>Tổng số mục: {products.length}</p>
        <div className={cx("Filter")}></div>
      </div>
      <div className={cx("Modal")}>
        <table className={cx("full-table")}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProduct.map((product, index) => (
              <tr key={product._id}>
                <td>{index + 1}</td>
                <td>
                  <img src={product.images} alt="" width="50px" height="50px" />
                </td>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>
                  <Link to={`/product/${product._id}`}>
                    <button className={cx("btn-action")}>Sửa</button>
                  </Link>
                  <button
                    className={cx("btn-action")}
                    onClick={() => handleDeleteProduct(product._id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={cx("pageNumber")}>
          <h5>Trang</h5>
          {pageNumbers.map((pageNumber) => (
            <button key={pageNumber} onClick={() => setCurrentPage(pageNumber)}>
              {pageNumber}
            </button>
          ))}
        </div>
      </div>
    </article>
  );
}

export default ProductAdmin;
