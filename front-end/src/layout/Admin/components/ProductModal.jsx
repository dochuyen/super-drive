import React, { useState } from "react";
import axios from "axios";
import styles from "./ProductAdmin.module.scss"; // Import CSS file

function ProductForm({ onProductCreated }) {
  const [product, setProduct] = useState({
    title: "",
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
  const token = localStorage.getItem("token"); // Lấy token từ localStorage
  console.log(token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // Thêm token vào header
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
        alert("Sản phẩm đã được tạo thành công!");
        setProduct({
          title: "",

          description: "",
          brand: "",
          price: 0,

          images: [],
        });
      } else {
        alert("Không thể tạo sản phẩm: " + response.data.message);
      }
    } catch (error) {
      alert("Lỗi khi tạo sản phẩm: " + error.message);
    }
  };

  return (
    <form className={styles.productForm} onSubmit={handleSubmit}>
      <label htmlFor="title">Tiêu đề:</label>
      <input
        type="text"
        id="title"
        name="title"
        value={product.title}
        onChange={handleChange}
        required
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
          <img
            key={index}
            src={imageUrl}
            alt={`"A beautiful landscape" ${index}`}
          />
        ))}
      </div>
      <button type="submit" className={styles.submitButton}>
        Tạo sản phẩm
      </button>
    </form>
  );
}

export default ProductForm;
