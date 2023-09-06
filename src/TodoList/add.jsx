import React, { useState } from "react";
import axios from "axios";
const items = ["Accenture", "Amazon", "Microsoft", "Google"];
function Add() {
  const [form, setForm] = useState({
    id: "",
    Todo_name: "",
    Category: "",
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/todo", form);
      console.log(res.data);
      alert("Data added successfully");
    } catch (err) {
      console.error(err);
      if (err.response.status === 409) {
        alert(err.response.data.error);
      } else {
        alert("Data cannot be added");
      }
    }
    setForm({
      id: "",
      Todo_name: "",
      Category: "",
    });
  };

  return (
    <div>
      <div className="d-flex justify-content-center">
        <form
          class="border rounded p-3  m-5 bg-secondary"
          onSubmit={handleSubmit}
        >
          <input
            type="number"
            name="id"
            placeholder="Id"
            value={form.id}
            onChange={handleChange}
            required
            class="mb-1"
          />
          <br />
          <input
            type="text"
            name="Todo_name"
            placeholder="Name"
            value={form.Todo_name}
            onChange={handleChange}
            required
            class="mb-1"
          />
          <br />
          {/* <input
            type="text"
            name="Category"
            placeholder="Category"
            value={form.Category}
            onChange={handleChange}
            required
            class="mb-1"
          /> */}
          <select onChange={handleChange} name="Category">
            {items.map((item, index) => (
              <option key={index} value={form.category}>
                {item}
              </option>
            ))}
          </select>
          <br />
          <button
            class="bg-primary text-light border rounded p-1"
            type="submit"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default Add;
