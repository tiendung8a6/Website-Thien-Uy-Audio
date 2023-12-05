import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getProduct, updateProduct } from "../../../functions/product";
import { getRelated } from "../../../functions/product";
import { getCategories, getCategorySubs } from "../../../functions/category";
import FileUpload from "../../../components/forms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";
import { getBrands } from "../../../functions/brand";
import { getColors } from "../../../functions/color";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const initialState = {
  title: "",
  description: "",
  price: "",
  category: "",
  subs: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: [],
  brands: [],
  color: "",
  brand: "",
  status: "",
  Guarantee: "",
  Origin: "",
};

const ProductUpdate = ({ match, history }) => {
  // state
  const [values, setValues] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [subOptions, setSubOptions] = useState([]);
  const [arrayOfSubs, setArrayOfSubs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [colors, setColors] = useState([]);
  const [brands, setBrands] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));
  // router
  const { slug } = match.params;

  // update code table product list detail-------------------------------------------------------------------
  const [product, setProduct] = useState({});
  const [related, setRelated] = useState([]);



  useEffect(() => {
    loadSingleProduct();
  }, [slug]);



  const loadSingleProduct = () => {
    getProduct(slug).then((res) => {
      setProduct(res.data);
      // load related
      getRelated(res.data._id).then((res) => setRelated(res.data));
    });
  };
  const {
    title,
    price,
    category,
    subs,
    shipping,
    color,
    brand,
    quantity,
    sold,
    status,
    Guarantee,
    Origin,
  } = product;


  // ----------------------------------------------------------------
  useEffect(() => {
    loadProduct();
    loadCategories();
    loadColors();
    loadBrands();
  }, []);

  const loadProduct = () => {
    getProduct(slug).then((p) => {
      setValues({ ...values, ...p.data });
      getCategorySubs(p.data.category._id).then((res) => {
        setSubOptions(res.data);
      });
      let arr = [];
      p.data.subs.map((s) => {
        arr.push(s._id);
      });
      console.log("ARR", arr);
      setArrayOfSubs((prev) => arr);
    });
  };

  const loadCategories = () =>
    getCategories().then((c) => {
      console.log("GET CATEGORIES IN UPDATE PRODUCT", c.data);
      setCategories(c.data);
    });

  const loadColors = () =>
    getColors().then((cl) => {
      console.log("GET COLORS IN UPDATE PRODUCT", cl.data);
      setColors(cl.data);
    });

  const loadBrands = () =>
    getBrands().then((b) => {
      console.log("GET BRANDS IN UPDATE PRODUCT", b.data);
      setBrands(b.data);
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    values.subs = arrayOfSubs;
    values.category = selectedCategory ? selectedCategory : values.category;

    updateProduct(slug, values, user.token)
      .then((res) => {
        setLoading(false);
        toast.success(`Sản phẩm "${res.data.title}" đã được cập nhật thành công`);
        history.push("/admin/products");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error(err.response.data.err);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });

  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    console.log("CLICKED CATEGORY", e.target.value);
    setValues({ ...values, subs: [] });
    setSelectedCategory(e.target.value);
    getCategorySubs(e.target.value).then((res) => {
      console.log("SUB OPTIONS ON CATGORY CLICK", res);
      setSubOptions(res.data);
    });
    console.log("EXISTING CATEGORY values.category", values.category);
    if (values.category._id === e.target.value) {
      loadProduct();
    }
    setArrayOfSubs([]);
  };

  const handleColorChange = (e) => {
    e.preventDefault();
    const selectedValue = e.target.value;
    setValues({ ...values, color: selectedValue });
  };
  const handleBrandChange = (e) => {
    e.preventDefault();
    const selectedValue = e.target.value;
    setValues({ ...values, brand: selectedValue });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <AdminNav />
        </div>

        <div className="col">
          {loading ? (
            <LoadingOutlined className="text-danger h1" />
          ) : (
            <h4>Chỉnh sửa sản phẩm</h4>
          )}

          {/* {JSON.stringify(values)} */}

          <div className="p-3">
            <div>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500, height: 50 }} aria-label="simple table" >
                  <TableRow colSpan={2} style={{ fontSize: '30px' }}>
                    Thông tin sản phẩm
                  </TableRow>
                  <TableRow >
                    <TableCell component="th" scope="row">
                      Tên Sản Phẩm
                    </TableCell>
                    <TableCell align="right"> {title} </TableCell>
                  </TableRow>
                  <TableRow colSpan={2}>
                    <TableCell component="th" scope="row">
                      Giá
                    </TableCell>
                    <TableCell align="right"> {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price)} </TableCell>
                  </TableRow>

                  <TableRow >
                    <TableCell component="th" scope="row">
                      Tình trạng sản phẩm
                    </TableCell>
                    <TableCell align="right"> {status} </TableCell>
                  </TableRow>

                  <TableRow >
                    <TableCell component="th" scope="row">
                      Xuất sứ
                    </TableCell>
                    <TableCell align="right"> {Origin} </TableCell>
                  </TableRow>
                </Table>
              </TableContainer>


              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500, height: 50 }} aria-label="simple table" >


                  <TableHead style={{ width: '500px' }}>
                    <TableRow>
                      <TableCell>Thương hiệu</TableCell>
                      <TableCell>Bảo hành</TableCell>


                      <TableCell >Số lượng</TableCell>

                    </TableRow>
                  </TableHead>
                  <TableBody>

                    <TableRow >
                      <TableCell component="th" scope="row">
                        {brand}
                      </TableCell>

                      <TableCell component="th" scope="row">
                        {Guarantee}
                      </TableCell>


                      <TableCell component="th" scope="row">
                        {quantity}
                      </TableCell>
                    </TableRow>
                  </TableBody>


                </Table>
              </TableContainer>

            </div>
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>

          <ProductUpdateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            setValues={setValues}
            values={values}
            subOptions={subOptions}
            arrayOfSubs={arrayOfSubs}
            setArrayOfSubs={setArrayOfSubs}
            handleCategoryChange={handleCategoryChange}
            selectedCategory={selectedCategory}
            categories={categories}
            handleColorChange={handleColorChange}
            colors={colors}
            handleBrandChange={handleBrandChange}
            brands={brands}
          />
          <hr />
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;