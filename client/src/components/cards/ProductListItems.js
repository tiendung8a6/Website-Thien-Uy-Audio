import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from "react-router-dom";

const ProductListItems = ({ product }) => {
  const {
    price,
    category,
    subs,
    shipping,
    color,
    brand,
    quantity,
    sold,
  } = product;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="simple table">

        <TableBody>
          <TableRow >
            <TableCell component="th" scope="row">
              Giá
            </TableCell>
            <TableCell align="right"> {price} VNĐ</TableCell>
          </TableRow>



          {category && (
            // <li className="list-group-item">
            //   Category{" "}
            //   <Link
            //     to={`/category/${category.slug}`}
            //     className="label label-default label-pill pull-xs-right"
            //   >
            //     {category.name}
            //   </Link>
            // </li>
            <TableRow >
              <TableCell component="th" scope="row">
                Danh mục
              </TableCell>
              <TableCell align="right"><Link to={`/category/${category.slug}`}>{category.name} </Link></TableCell>
            </TableRow>
          )}

          {subs && (

            <TableRow >
              <TableCell component="th" scope="row">
                Danh mục con
              </TableCell>
              <TableCell align="right">
                {subs.map((s) => (
                  <Link
                    key={s._id}
                    to={`/sub/${s.slug}`}
                    className="label label-default label-pill pull-xs-right"
                  >
                    {s.name}
                  </Link>
                ))}
              </TableCell>
            </TableRow>
          )}


          <TableRow >
            <TableCell component="th" scope="row">
              Giao Hàng
            </TableCell>
            <TableCell align="right">{shipping}</TableCell>

          </TableRow>

          <TableRow >
            <TableCell component="th" scope="row">
              Màu sắc
            </TableCell>
            <TableCell align="right">{color}</TableCell>

          </TableRow>

          <TableRow >
            <TableCell component="th" scope="row">
              Thương hiệu
            </TableCell>
            <TableCell align="right">{brand}</TableCell>

          </TableRow>

          <TableRow >
            <TableCell component="th" scope="row">
              Số lượng
            </TableCell>
            <TableCell align="right">{quantity}</TableCell>

          </TableRow>

          <TableRow >
            <TableCell component="th" scope="row">
              Đã bán ra
            </TableCell>
            <TableCell align="right">{sold}</TableCell>

          </TableRow>

        </TableBody>
      </Table>
    </TableContainer>
    // <ul className="list-group">
    //   <li className="list-group-item">
    //     Price{" "}
    //     <span className="label label-default label-pill pull-xs-right">
    //       $ {price}
    //     </span>
    //   </li>

    //   {category && (
    //     <li className="list-group-item">
    //       Category{" "}
    //       <Link
    //         to={`/category/${category.slug}`}
    //         className="label label-default label-pill pull-xs-right"
    //       >
    //         {category.name}
    //       </Link>
    //     </li>
    //   )}

    //   {subs && (
    //     <li className="list-group-item">
    //       Sub Categories
    //       {subs.map((s) => (
    //         <Link
    //           key={s._id}
    //           to={`/sub/${s.slug}`}
    //           className="label label-default label-pill pull-xs-right"
    //         >
    //           {s.name}
    //         </Link>
    //       ))}
    //     </li>
    //   )}

    //   <li className="list-group-item">
    //     Shipping{" "}
    //     <span className="label label-default label-pill pull-xs-right">
    //       {shipping}
    //     </span>
    //   </li>

    //   <li className="list-group-item">
    //     Color :{" "}
    //     <span className="label label-default label-pill pull-xs-right">
    //       {color}
    //     </span>
    //   </li>

    //   <li className="list-group-item">
    //     Brand{" "}
    //     <span className="label label-default label-pill pull-xs-right">
    //       {brand}
    //     </span>
    //   </li>

    //   <li className="list-group-item">
    //     Available{" "}
    //     <span className="label label-default label-pill pull-xs-right">
    //       {quantity}
    //     </span>
    //   </li>

    //   <li className="list-group-item">
    //     Sold{" "}
    //     <span className="label label-default label-pill pull-xs-right">
    //       {sold}
    //     </span>
    //   </li>
    // </ul>
  );
};

export default ProductListItems;
