import React, { useState } from "react";

import UserAdmin from "./components/UserAdmin.jsx";

import styles from "./components/admin.module.scss";
import classNames from "classnames/bind";

import { Link } from "react-router-dom";
import ProductAdmin from "./components/ProductAdmin";

const cx = classNames.bind(styles);

function AdminPage() {
  const [activeModal, setActiveModal] = useState(null);

  const handleModalClick = (modalName) => {
    setActiveModal(modalName);
  };
  const closeModal = () => {
    setActiveModal(null);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <section className={cx("admin")}>
      <div className={cx("Taskbar")}>
        <button onClick={() => handleModalClick("User")}>
          {" "}
          <Link to="/user">User</Link>
        </button>
        <button onClick={() => handleModalClick("Product")}>
          <Link to="/product">Product</Link>
        </button>
        <button onClick={() => handleModalClick("Setting")}>Setting</button>
      </div>
      <div className={cx("Modals")}>
        {activeModal === "User" && (
          <UserAdmin
            activeModal={activeModal}
            closeModal={closeModal}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            indexOfFirst={indexOfFirst}
            indexOfLast={indexOfLast}
            setCurrentPage={setCurrentPage}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        )}
        {activeModal === "Product" && (
          <ProductAdmin
            activeModal={activeModal}
            closeModal={closeModal}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            indexOfFirst={indexOfFirst}
            indexOfLast={indexOfLast}
            setCurrentPage={setCurrentPage}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        )}
        {activeModal === "Setting" && <></>}
      </div>
    </section>
  );
}

export default AdminPage;
