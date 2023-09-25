import React from "react";
import { Input } from "antd";

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
      className="mb-4"
      size="medium"
      enterButton
      // style={{
      //   width: 900,
      // }}
    />
  );
};

export default LocalSearch;
