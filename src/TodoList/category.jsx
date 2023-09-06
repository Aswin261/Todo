import React, { useState, useEffect } from "react";
import axios from "axios";

function Category({ onCategorySelect }) {
  const [form, setForm] = useState({
    Category: "",
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/category", form);
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
      Category: "",
    });
  };

  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/category")
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [items]);

  const handleSelectChange = (e) => {
    const selectedCategory = e.target.value;
    onCategorySelect(selectedCategory);
  };

  return (
    <div class="m-0">
      <select onChange={handleSelectChange}>
        {items.map((item) => (
          <option key={item._id} value={item._id}>
            {item.Category}
          </option>
        ))}
      </select>
      {/* <div className="d-flex justify-content-center">
        <form
          class="border rounded p-3  m-5 bg-secondary"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="Category"
            placeholder="Category"
            value={form.Category}
            onChange={handleChange}
            required
            class="mb-1"
          />
          <br />
          <button
            class="bg-primary text-light border rounded p-1"
            type="submit"
          >
            Add
          </button>
        </form>
      </div> */}
    </div>
  );
}

export default Category;
