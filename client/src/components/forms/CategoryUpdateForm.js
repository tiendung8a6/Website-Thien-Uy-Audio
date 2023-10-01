import React from "react";

const CategoryUpdateForm = ({
  handleSubmit,
  handleChange,
  setValues,
  values,
}) => {
  // destructure
  const {
    name,
  } = values;

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>name</label>
        <input
          type="text"
          name="name"
          className="form-control"
          value={name}
          onChange={handleChange}
        />
      </div>

      <br />
      <button className="btn btn-outline-info">Save</button>
    </form>
  );
};

export default CategoryUpdateForm;