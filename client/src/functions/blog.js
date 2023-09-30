import axios from "axios";

export const createBlog = async (blog, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/blog`, blog, {
    headers: {
      authtoken,
    },
  });

export const getBlogsByCount = async (count) =>
  await axios.get(`${process.env.REACT_APP_API}/blogs/${count}`);

export const removeBlog = async (slug, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/blog/${slug}`, {
    headers: {
      authtoken,
    },
  });

export const getBlog = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/blog/${slug}`);

export const updateBlog = async (slug, blog, authtoken) =>
  await axios.put(`${process.env.REACT_APP_API}/blog/${slug}`, blog, {
    headers: {
      authtoken,
    },
  });

export const getBlogList = async (page) =>
  await axios.post(`${process.env.REACT_APP_API}/blogs`, { page });

export const getBlogCount = async () =>
  await axios.get(`${process.env.REACT_APP_API}/blogs/total`);

