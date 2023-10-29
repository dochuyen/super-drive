import styles from "./UserModal.module.scss"; // Import CSS file

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
export const UserAddModal = ({ isModalOpen, closeModal, handleAddUser }) => {
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
  });




  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

  const handleAdd = () => {
    handleAddUser(newUser);
  };

  return (
    <div className={isModalOpen ? styles.modal : styles.modalHidden}>
      <div className={styles.formContainer}>
        <h3>Thêm người dùng mới</h3>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={newUser.username}
          onChange={handleChange}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          value={newUser.email}
          onChange={handleChange}
        />
        <label htmlFor="password">Mật khẩu:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={newUser.password}
          onChange={handleChange}
        />
        <button className={styles.addButton} onClick={handleAdd}>
          Thêm
        </button>
        <button className={styles.closeButton} onClick={closeModal}>
          Đóng
        </button>
      </div>
    </div>
  );
};

export function EditUser({ isModalOpen, closeModal }) {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [editedUser, setEditedUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/api/user/${id}`)
      .then((response) => {
        setUser(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching user data: ", error);
      });
  }, [id]);

  const handleSave = () => {
    // Gọi API để cập nhật thông tin người dùng
    axios
      .put(`${process.env.REACT_APP_API_KEY}/api/user/${id}`, editedUser)
      .then((response) => {
        // Cập nhật thông tin người dùng sau khi cập nhật thành công
        setUser(response.data.data);
        // Chuyển hướng về trang quản lý người dùng sau khi lưu
      })
      .catch((error) => {
        console.error("Error updating user: ", error);
      });
  };

  return (
    <div className={isModalOpen ? styles.modalEdit : styles.modalHidden}>
      <div className={styles.formContainer}>
        <h2>Chỉnh sửa thông tin người dùng</h2>
        <label>Username:</label>
        <input
          type="text"
          value={editedUser.username}
          onChange={(e) =>
            setEditedUser({ ...editedUser, username: e.target.value })
          }
        />
        <label>Email:</label>
        <input
          type="text"
          value={editedUser.email}
          onChange={(e) =>
            setEditedUser({ ...editedUser, email: e.target.value })
          }
        />
        <label>Password:</label>
        <input
          type="password"
          value={editedUser.password}
          onChange={(e) =>
            setEditedUser({ ...editedUser, password: e.target.value })
          }
        />
        <button className={styles.addButton} onClick={handleSave}>
          Lưu
        </button>
        <button className={styles.closeButton} onClick={closeModal}>
          Đóng
        </button>
      </div>
    </div>
  );
}
