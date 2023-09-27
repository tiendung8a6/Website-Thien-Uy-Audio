import React from "react";
import { Input } from "antd";
import './search.css'
const { Search } = Input;
const LocalSearch = ({ keyword, setKeyword }) => {
  const handleSearchChange = (e) => {
    setKeyword(e.target.value.toLowerCase());
  };

  return (
    <Search
      type="search"
      placeholder="Tìm kiếm danh mục"
      value={keyword}
      onChange={handleSearchChange}
      className=" d-flex align-items-start"
      size="medium"
      enterButton

    />
  );
};

export default LocalSearch;
