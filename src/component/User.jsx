import React, { useState } from "react";
import "../stylecss/User.css";
import { toast } from "react-toastify";

const User = () => {
  const [input, setInput] = useState("");
  const [item, setItem] = useState([]);
  const [isEdit, setIsEdit] = useState("");
  const [toggle, setToggle] = useState(true);

  const addBtn = () => {
    if (input === "") {
      toast.warn("Please Fill the Field", {
        position: "top-center",
        autoClose: 1000,
      });
    } else if (input && isEdit) {
      setItem(
        item.map((curEle) => {
          if (curEle.id === isEdit) {
            return { ...curEle, name: input };
          }
          return curEle;
        }),
      );
      setInput("");
      setIsEdit(null);
      setToggle(true);
    } else {
      const inputData = {
        id: new Date().getTime().toString(),
        name: input,
      };
      setItem([...item, inputData]);
      setInput("");
    }
  };

  const delBtn = (id) => {
    const del = item.filter((ele) => {
      return id !== ele.id;
    });
    setItem(del);
  };

  const editBtn = (id) => {
    const editid = item.find((ele) => {
      return id === ele.id;
    });
    setInput(editid.name);
    setIsEdit(editid.id);
    setToggle(false);
  };

  return (
    <div className="user-container">
      <h1 className="user-header">Users List</h1>
      <div className="user-input-container">
        <input
          type="text"
          name="fname"
          value={input}
          placeholder="Enter User Name"
          onChange={(e) => setInput(e.target.value)}
          className="user-input"
        />
        {toggle ? (
          <button onClick={addBtn} className="user-button add-button">
            Add User
          </button>
        ) : (
          <button className="user-button edit-button" onClick={addBtn}>
            Update
          </button>
        )}
      </div>

      {item.length === 0 ? (
        <h5 className="no-data">No Data Found</h5>
      ) : (
        <div className="user-list-container">
          <table className="user-table">
            <thead>
              <tr>
                <th>User Name</th>
                <th className="action-column">Action</th>
              </tr>
            </thead>
            <tbody>
              {item.map((ele) => (
                <tr key={ele.id}>
                  <td className="user-name">{ele.name}</td>
                  <td className="action-buttons">
                    <button
                      className="user-button edit-button"
                      onClick={() => editBtn(ele.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="user-button delete-button"
                      onClick={() => delBtn(ele.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default User;
