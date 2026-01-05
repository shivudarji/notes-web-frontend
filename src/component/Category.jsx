import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axiosRequest from "../login/axiosRequest";
import APIUrl from "../login/APIUrl";
import "bootstrap/dist/css/bootstrap.min.css";
import "../stylecss/Category.css";
import Notes from "./Notes";
import getCategoryData from "../actions/CategoryAction";
import { Pagination } from "antd";
import "@ant-design/v5-patch-for-react-19";
import { Modal } from "antd";

const Category = () => {
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
  });

  // API endpoints
  const API_ENDPOINTS = {
    GET_CATEGORY: `${APIUrl}/get-category`,
    ADD_CATEGORY: `${APIUrl}/create-category`,
    UPDATE_CATEGORY: `${APIUrl}/update-category`,
    DELETE_CATEGORY: `${APIUrl}/delete-category`,
  };

  useEffect(() => {
    const getCategory = async () => {
      const list = await getCategoryData();
      setCategories(list);
      setPagination((prev) => ({
        ...prev,
        total: list.length,
      }));
    };
    getCategory();
  }, []);

  // Handle pagination change
  const handlePaginationChange = (page, pageSize) => {
    setPagination({
      current: page,
      pageSize,
      total: categories.length,
    });
  };
  // Get current page data
  const getCurrentPageData = () => {
    const start = (pagination.current - 1) * pagination.pageSize;
    const end = start + pagination.pageSize;
    return categories.slice(start, end);
  };

  const handleApiError = (error) => {
    // if (error.response) {
    //  toast.error(error.response.data.message || 'Server error occurred');
    if (error.response) {
      toast.error(
        error.response?.message || `Server error (${error.response.status})`,
      );
      // }
    } else if (error.request) {
      toast.error("No response from server");
    } else {
      toast.error("Error setting up request");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = (category) => {
    setFormData({
      name: category.name,
      description: category.description,
    });
    setIsEditing(category._id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    const deleteURL = `${API_ENDPOINTS.DELETE_CATEGORY}?categoryId=${id}`;

    Modal.confirm({
      title: "Confirm Delete",
      content: "Are you sure you want to delete this note?",
      okText: "Yes",
      okType: "danger", // Makes the button red
      cancelText: "No",
      onOk: async () => {
        try {
          await axiosRequest({
            method: "DELETE",
            url: deleteURL,
          });
          setCategories((prev) => prev.filter((cat) => cat._id !== id));

          toast.success("Category deleted successfully");
          // message.success('Note deleted successfully!'); // Optional success message
        } catch (error) {
          handleApiError(error);
        }
      },
      onCancel: () => {
        console.log("Deletion cancelled");
      },
    });

    //  } finally {
    //   setIsLoading(false);
    // }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name) {
      toast.warning("Please enter a category name");
      return;
    } else if (!formData.description) {
      toast.warning("Please enter a description");
      return;
    }

    try {
      setIsLoading(true);
      let response;

      if (isEditing) {
        console.warn("............isEdit category", isEditing);
        response = await axiosRequest({
          method: "POST",
          url: `${API_ENDPOINTS.UPDATE_CATEGORY}/${isEditing}`,
          data: formData,
        });
        console.warn("............isEdit category response", response);

        // Update existing category in state
        setCategories((prev) =>
          prev.map((cat) =>
            cat._id === isEditing ? { ...cat, ...formData } : cat,
          ),
        );
        toast.success("Category updated successfully");
        // navigate(`/notes/${isEditing}`);
      } else {
        response = await axiosRequest({
          method: "POST",
          url: API_ENDPOINTS.ADD_CATEGORY,
          data: formData,
        });

        // Add new category to state
        setCategories((prev) => [...prev, response.category]);
        toast.success("Category added successfully");
      }

      // Reset form and close modal
      resetForm();
      setIsModalOpen(false);
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: "", description: "" });
    setIsEditing(null);
  };

  // useEffect(() => {

  //   MainCategory()
  // }, []);

  return (
    <div className="category">
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Categories</h2>
          <button
            className="btn btn-primary"
            onClick={() => {
              resetForm();
              setIsModalOpen(true);
            }}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Add Category"}
          </button>
        </div>

        {/* Category Modal */}
        {isModalOpen && (
          <div
            className="modal show"
            style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {isEditing ? "Edit Category" : "Add Category"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => {
                      setIsModalOpen(false);
                      resetForm();
                    }}
                    disabled={isLoading}
                  />
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label">
                        Category Name <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter category name"
                        required
                        disabled={isLoading}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">
                        Description <span style={{ color: "red" }}>*</span>
                      </label>
                      <textarea
                        className="form-control"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows="3"
                        placeholder="Enter description"
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => {
                        setIsModalOpen(false);
                        resetForm();
                      }}
                      disabled={isLoading}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isLoading}
                    >
                      {isLoading
                        ? "Processing..."
                        : isEditing
                          ? "Update"
                          : "Save"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {isLoading && !isModalOpen ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="table-responsive mx-auto">
            <table className="table table-full">
              <thead className="table-light">
                <tr style={{ textAlign: "center" }}>
                  <th className="col-1">#</th>
                  <th className="col-2">Name</th>
                  <th className="col-5">Description</th>
                  <th className="col-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {getCurrentPageData().length > 0 ? (
                  getCurrentPageData().map((category, index) => (
                    <tr key={category._id}>
                      <td>
                        {(pagination.current - 1) * pagination.pageSize +
                          index +
                          1}
                      </td>
                      <td className="col-2 align-middle">{category.name}</td>
                      <td className="col-5 align-middle">
                        {category.description || "N/A"}
                      </td>
                      <td className="col-4 align-middle">
                        <button
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() => handleEdit(category)}
                          disabled={isLoading}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(category._id)}
                          disabled={isLoading}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4">
                      No categories found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="pagination-center">
              <Pagination
                current={pagination.current}
                pageSize={pagination.pageSize}
                total={categories.length}
                onChange={handlePaginationChange}
                showSizeChanger
                showQuickJumper
                showTotal={(total) => `Total ${total} categories`}
                disabled={isLoading}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
