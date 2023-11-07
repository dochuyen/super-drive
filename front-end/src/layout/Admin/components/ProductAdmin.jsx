import React, { useState, useEffect } from "react";
import styles from "./UserAdmin.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import axios from "axios";
import { EditProduct, ProductForm } from "./ProductModal.jsx";

const cx = classNames.bind(styles);

function ProductAdmin({
  currentPage,
  itemsPerPage,
  indexOfFirst,
  indexOfLast,
  setCurrentPage,
  searchTerm,
  setSearchTerm,
}) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [products, setProducts] = useState([]);

  const filteredProducts = products.filter((product) => {
    return product.title.toLowerCase().includes(searchTerm.toLowerCase());
  });
  const currentProduct = filteredProducts.slice(indexOfFirst, indexOfLast);
  const pageNumbers = [];
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  useEffect(() => {
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
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId)
        );
      })
      .catch((error) => {
        console.error("Error deleting product: ", error);
      });
  };
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const handleAddProduct = async (newProduct) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_KEY}/api/product`,
        newProduct,
        config
      );

      if (response.data.success) {
        axios
          .get(`${process.env.REACT_APP_API_KEY}/api/product`)
          .then((response) => {
            setProducts(response.data.data);
            setIsAddModalOpen(false);
          })

          .catch((error) => {
            console.error("Error fetching updated product data: ", error);
          });
      }
    } catch (error) {
      console.error("Error adding product: ", error);
      alert("Có lỗi xảy ra khi thêm sản phẩm. Vui lòng thử lại sau.");
    }
  };

  return (
    <article>
      <div className={cx("modal-title")}>
        <h2>Quản lý sản phẩm</h2>
        <button onClick={() => setIsAddModalOpen(true)}>+</button>
      </div>
      {isAddModalOpen && (
        <ProductForm
          isModalOpen={isAddModalOpen}
          setIsAddModalOpen={setIsAddModalOpen}
          closeModal={() => setIsAddModalOpen(false)}
          handleAddProduct={handleAddProduct}
        />
      )}
      <div className={cx("modal-filter")}>
        <p>Tổng số mục: {filteredProducts.length}</p>
        <input
          type="text"
          value={searchTerm}
          placeholder="Tìm kiếm sản phẩm..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
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
                    <button
                      className={cx("btn-action")}
                      onClick={() => setIsEditModalOpen(true)}
                    >
                      Sửa
                    </button>
                  </Link>
                  <Link to={`/product`}>
                    <button
                      className={cx("btn-action")}
                      onClick={() => handleDeleteProduct(product._id)}
                    >
                      Xóa
                    </button>
                  </Link>
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
        {isEditModalOpen && (
          <EditProduct
            isModalOpen={isEditModalOpen}
            closeModal={() => setIsEditModalOpen(false)}
            products={products}
            setProducts={setProducts}
          />
        )}
      </div>
    </article>
  );
}

export default ProductAdmin;