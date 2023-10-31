import React, { useState } from "react";
import axios from "axios";
import styles from "./ProductModal.module.scss"; // Import CSS file
import { useParams } from "react-router-dom";

export function ProductForm({ onProductCreated, isModalOpen, closeModal }) {
  const [product, setProduct] = useState({
    title: "",
    slug: "",
    description: "",
    brand: "",
    price: 0,

    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    const imageUrls = [];

    for (let i = 0; i < files.length; i++) {
      const imageUrl = URL.createObjectURL(files[i]);
      imageUrls.push(imageUrl);
    }

    setProduct({
      ...product,
      images: imageUrls,
    });
  };
  const token = localStorage.getItem("token");
  console.log(token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_KEY}/api/product`,
        product,
        config
      );

      if (response.data.success) {
        onProductCreated(response.data.createProductData);
        setProduct({
          title: "",
          slug: "",
          description: "",
          brand: "",
          price: 0,
          images: [{}],
        });
        alert("Sản phẩm đã được tạo thành công!");
      } else {
        alert("Không thể tạo sản phẩm: " + response.data.message);
      }
    } catch (error) {}
  };

  return (
    <div className={isModalOpen ? styles.modalEdit : styles.modalHidden}>
      <div className={styles.formContainer}>
        <h1>Thêm sản phẩm mới</h1>
        <label htmlFor="title">Tiêu đề:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={product.title}
          onChange={handleChange}
          required
        />
        <label htmlFor="slug" style={{ display: "none" }}>
          slug:
        </label>
        <input
          type="text"
          id="slug"
          name="slug"
          value={product.slug}
          onChange={handleChange}
          style={{ display: "none" }}
        />
        <label htmlFor="description">Mô tả:</label>
        <textarea
          id="description"
          name="description"
          value={product.description}
          onChange={handleChange}
          required
        />
        <label htmlFor="brand">Nhãn hiệu:</label>
        <input
          type="text"
          id="brand"
          name="brand"
          value={product.brand}
          onChange={handleChange}
          required
        />
        <label htmlFor="price">Giá:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={product.price}
          onChange={handleChange}
          required
        />

        <label htmlFor="images">Hình ảnh:</label>
        <input
          type="file"
          id="images"
          name="images"
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />
        <div className={styles.imagePreview}>
          {product.images.map((imageUrl, index) => (
            <img key={index} src={imageUrl} alt={` ${index}`} />
          ))}
        </div>
        <button
          type="submit"
          className={styles.addButton}
          onClick={handleSubmit}
        >
          Tạo sản phẩm
        </button>
        <button className={styles.closeButton} onClick={closeModal}>
          Đóng
        </button>
      </div>
    </div>
  );
}

export const EditProduct = ({
  isModalOpen,
  closeModal,
  products,
  setProducts,
}) => {
  const [editProduct, setEditProduct] = useState({
    title: "",
    slug: "",
    description: "",
    brand: "",
    price: 0,
    images: [{}],
  });
  const { id } = useParams();
  console.log(id);

  const handleImageChange = (e) => {
    const files = e.target.files;
    const imageUrls = [];

    for (let i = 0; i < files.length; i++) {
      const imageUrl = URL.createObjectURL(files[i]);
      imageUrls.push(imageUrl);
    }

    setEditProduct({
      ...editProduct,
      images: imageUrls,
    });
  };

  const handleEdit = () => {
    axios
      .put(`${process.env.REACT_APP_API_KEY}/api/product/${id}`, editProduct)
      .then((response) => {
        setProducts(response.data.data);
      })
      .catch((error) => {
        console.error("Lỗi khi cập nhật sản phẩm: ", error);
      });
  };

  return (
    <div className={isModalOpen ? styles.modalEdit : styles.modalHidden}>
      <div className={styles.formContainer}>
        <h2>Chỉnh sửa thông tin sản phẩm</h2>
        <label>Tiêu đề:</label>
        <input
          type="text"
          value={editProduct.title}
          onChange={(e) =>
            setEditProduct({ ...editProduct, title: e.target.value })
          }
        />
        <label htmlFor="slug" style={{ display: "none" }}>
          <input
            style={{ display: "none" }}
            type="text"
            value={editProduct.slug}
            onChange={(e) =>
              setEditProduct({ ...editProduct, slug: e.target.value })
            }
          />{" "}
          slug:
        </label>
        <label>Mô tả:</label>
        <input
          type="text"
          value={editProduct.description}
          onChange={(e) =>
            setEditProduct({ ...editProduct, description: e.target.value })
          }
        />
        <label>Thương hiệu (brand):</label>
        <input
          type="text"
          value={editProduct.brand}
          onChange={(e) =>
            setEditProduct({ ...editProduct, brand: e.target.value })
          }
        />
        <label>Giá:</label>
        <input
          type="number"
          value={editProduct.price}
          onChange={(e) =>
            setEditProduct({
              ...editProduct,
              price: parseFloat(e.target.value),
            })
          }
        />{" "}
        <label>Hình ảnh:</label>
        <input
          type="file"
          id="images"
          name="images"
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />
        <div className={styles.imagePreview}>
          {editProduct.images.map((imageUrl, index) => (
            <img key={index} src={imageUrl} alt={`${index}`} />
          ))}
        </div>
        <button className={styles.addButton} onClick={handleEdit}>
          Lưu
        </button>
        <button className={styles.closeButton} onClick={closeModal}>
          Đóng
        </button>
      </div>
    </div>
  );
};
