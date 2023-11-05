import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./ProductModal.module.scss"; // Import CSS file
import { useParams } from "react-router-dom";

export function ProductForm({ isModalOpen, closeModal, handleAddProduct }) {
  const [brand, setBrand] = useState([]);
  const [newProduct, setnewProduct] = useState({
    title: "",
    slug: "",
    description: "",
    brand: "",
    price: 0,

    images: [],
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/api/brand`)
      .then((response) => {
        setBrand(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching  data: ", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setnewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    const imageFiles = [];

    for (let i = 0; i < files.length; i++) {
      imageFiles.push(files[i]);
    }

    setnewProduct({
      ...newProduct,
      images: imageFiles,
    });
  };
  const handleAdd = () => {
    handleAddProduct(newProduct);
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
          value={newProduct.title}
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
          value={newProduct.slug}
          onChange={handleChange}
          style={{ display: "none" }}
        />
        <label htmlFor="description">Mô tả:</label>
        <textarea
          id="description"
          name="description"
          value={newProduct.description}
          onChange={handleChange}
          required
        />
        <label htmlFor="brand">Nhãn hiệu:</label>

        {brand && brand.length > 0 && (
          <select name="brand" onChange={handleChange}>
            <option value="">Chọn nhãn hiệu</option>
            {brand.map((brands, index) => (
              <option key={index} value={brands._id}>
                {brands.name}
              </option>
            ))}
          </select>
        )}

        <label htmlFor="price">Giá:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={newProduct.price}
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

        <button type="submit" className={styles.addButton} onClick={handleAdd}>
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
  const brands = ["BMW", "Ferrari", "Lamborghini"];
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
        <select
          name="brand"
          value={editProduct.brand}
          onChange={(e) =>
            setEditProduct({ ...editProduct, brand: e.target.value })
          }
        >
          <option value="">Chọn nhãn hiệu</option>
          {brands.map((brand, index) => (
            <option key={index} value={brand}>
              {brand}
            </option>
          ))}
        </select>
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
