import React, { useEffect, useState } from "react";
import "../stylecss/Notes.css";
import "/node_modules/bootstrap/dist/css/bootstrap.min.css";
import axiosRequest from "../login/axiosRequest";
import APIUrl from "../login/APIUrl";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  addNote,
  updateNote,
  removeNote,
  setNotes,
} from "../features/notesSlice";
import AsyncSelect from "react-select/async";
import getCategoryData from "../actions/CategoryAction";
import "@ant-design/v5-patch-for-react-19";
// import { Modal } from 'antd';
import { Button, Popconfirm, message } from "antd";
import { Modal } from "antd";

const Notes = () => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const notes = useSelector((state) => state.notes.notes);
  const [currentPage, setCurrentPage] = useState(1);
  const notesPerPage = 6;

  // Calculate total pages
  const totalPages = Math.ceil(notes.length / notesPerPage);

  // Get current page notes
  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = notes.slice(indexOfFirstNote, indexOfLastNote);

  // Handle page change
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
  });

  const [isEditing, setIsEditing] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // API endpoints
  const API_ENDPOINTS = {
    GET_NOTES: `${APIUrl}/get-note`,
    ADD_NOTE: `${APIUrl}/create-note`,
    UPDATE_NOTE: `${APIUrl}/update-note`,
    DELETE_NOTE: `${APIUrl}/delete-note`,
  };

  // Fetch notes from API
  const fetchNotes = async () => {
    const NotesUrl = `${APIUrl}/get-note`;
    try {
      const response = await axiosRequest({
        method: "GET",
        url: NotesUrl,
      });
      dispatch(setNotes(response.data));
    } catch (error) {
      handleApiError(error);
    }
  };

  // Handle API errors
  const handleApiError = (error) => {
    let errorMessage = "An error occurred";
    if (error.response) {
      errorMessage =
        error.response.data.message || `Server error: ${error.response.status}`;
    } else if (error.request) {
      errorMessage = "No response received from server";
    }
    toast.error(errorMessage);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // Submit note (add or update)
  const handleSubmit = async () => {
    if (!formData.title && !formData.description && !formData.category) {
      toast.warning("Please enter title or description");
      return;
    }

    try {
      if (isEditing) {
        // Update existing note
        // const URLData = `${API_ENDPOINTS.UPDATE_NOTE}/${isEditing}`
        // console.warn('update res',formData)
        console.warn("Not error............", isEditing);

        const response = await axiosRequest({
          method: "POST",
          url: `${API_ENDPOINTS.UPDATE_NOTE}/${isEditing}`,
          data: formData,
        });
        console.warn("update res1.................", response);
        // dispatch(updateNote({
        //   id: response.note._id,
        //   ...formData
        // }));
        toast.success("Note updated successfully");
      } else {
        // const { category,...notesData} = formData;

        // Add new note
        const response = await axiosRequest({
          method: "POST",
          url: API_ENDPOINTS.ADD_NOTE,
          data: formData,
        });
        console.warn("add not", response);
        dispatch(
          addNote({
            id: response.note._id,
            ...formData,
          }),
        );
        toast.success("Note added successfully");
      }

      // Reset form and close modal
      setFormData({ title: "", description: "" });
      setIsEditing(null);
      setIsModalOpen(false);
      await fetchNotes();
    } catch (error) {
      console.warn("error............");
      handleApiError(error);
    }
  };

  // Delete note
  const handleDelete = async (id) => {
    Modal.confirm({
      title: "Confirm Delete",
      content: "Are you sure you want to delete this note?",
      okText: "Yes",
      okType: "danger", // Makes the button red
      cancelText: "No",
      onOk: async () => {
        try {
          const del = await axiosRequest({
            method: "DELETE",
            url: `${API_ENDPOINTS.DELETE_NOTE}/${id}`,
          });
          dispatch(removeNote(id));
          toast.success("Note deleted successfully!");
          // message.success('Note deleted successfully!'); // Optional success message
        } catch (error) {
          handleApiError(error);
        }
      },
      onCancel: () => {
        console.log("Deletion cancelled");
      },
    });
  };

  // Set up form for editing
  const handleEdit = (note) => {
    setFormData({
      title: note.title,
      description: note.description,
      category: note.category?._id || note.category || "",
    });
    setIsEditing(note._id);
    setIsModalOpen(true);
  };

  // Load notes on component mount
  useEffect(() => {
    setCurrentPage(1);
    fetchNotes();
  }, [notes.length]);

  useEffect(() => {
    const getCategoryData2 = async () => {
      const list = await getCategoryData();
      setCategories(list);
    };
    getCategoryData2();
    setCurrentPage(1);
  }, []);

  return (
    <div className="notes">
      <div className="notes-header">
        <h3>Notes Data</h3>
        <button
          className="btn btn-primary"
          onClick={() => {
            setFormData({ title: "", description: "", category: "" });
            setIsEditing(null);
            setIsModalOpen(true);
          }}
        >
          Add Note
        </button>
      </div>

      {/* Notes Modal */}
      {isModalOpen && (
        <div
          className="modal show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {isEditing ? "Edit Note" : "Add Note"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setIsModalOpen(false);
                    setFormData({ title: "", description: "", category: "" });
                    setIsEditing(null);
                  }}
                />
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">
                      Note Title <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Enter note title"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      Note Description <span style={{ color: "red" }}>*</span>
                    </label>
                    <textarea
                      className="form-control"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="3"
                      placeholder="Enter note description"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      Category <span style={{ color: "red" }}>*</span>
                    </label>
                    <select
                      className="form-control"
                      name="category" // This should match your state property
                      value={formData.category} // Use categoryId from formData
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Display selected category name */}
                  {formData.category && (
                    <div className="mt-2">
                      Selected:{" "}
                      {categories.find((c) => c._id === formData.category)
                        ?.name || "Unknown"}
                    </div>
                  )}
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setIsModalOpen(false);
                    setFormData({ title: "", description: "", category: "" });
                    setIsEditing(null);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  {isEditing ? "Update Note" : "Save Note"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notes List */}
      <div className="notes-list">
        {currentNotes.length === 0 ? (
          <div className="no-notes">No notes found. Add your first note!</div>
        ) : (
          <div className="row">
            {currentNotes.map((note) => (
              <div className="col-md-6 mb-3" key={note.id}>
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <div className="note-actions">
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => handleEdit(note)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(note._id)}
                      >
                        Delete
                      </button>{" "}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Always show pagination when there are notes */}
      {notes.length > 0 && (
        <div className="pagination-controls mt-4">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="pagination-button"
          >
            Previous
          </button>

          <span className="page-info">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="pagination-button"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Notes;
