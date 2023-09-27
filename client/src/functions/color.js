import axios from "axios";

export const getColors = async () =>
  await axios.get(`${process.env.REACT_APP_API}/colors`);

export const getColor = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/color/${slug}`);

export const removeColor = async (slug, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/color/${slug}`, {
    headers: {
      authtoken,
    },
  });

export const updateColor = async (slug, color, authtoken) =>
  await axios.put(`${process.env.REACT_APP_API}/color/${slug}`, color, {
    headers: {
      authtoken,
    },
  });

export const createColor = async (color, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/color`, color, {
    headers: {
      authtoken,
    },
  });
