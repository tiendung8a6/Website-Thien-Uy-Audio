import React, { useEffect, useState } from "react";
import { getBlog } from "../functions/blog";


// import { getRelated } from "../functions/blog";
import SingleBlog from "../components/cards/SingleBlog";

const Blog = ({ match }) => {
  const [blog, setBlog] = useState({});
  const { slug } = match.params;

  useEffect(() => {
    loadSingleBlog();
  }, [slug]);

  const loadSingleBlog = () => {
    getBlog(slug).then((res) => {
      setBlog(res.data);

    });
  };

  return (
    <div className="container-fluid">
      <div className="row pt-4">
        <SingleBlog
          blog={blog}
        />
      </div>
    </div>
  );
};

export default Blog;
