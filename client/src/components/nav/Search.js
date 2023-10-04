import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import SearchIcon from '@mui/icons-material/Search';
// import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchProduct from '../../../src/pages/admin/product/SearchProduct';

export default function SearchNav() {
    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('lg');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleMaxWidthChange = (event) => {
        setMaxWidth(
            // @ts-expect-error autofill of arbitrary value is not handled.
            event.target.value,
        );
    };

    const handleFullWidthChange = (event) => {
        setFullWidth(event.target.checked);
    };


    return (
        <React.Fragment>
            <Button onClick={handleClickOpen} >
                <SearchIcon />Search
            </Button>
            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                width="800px"
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Tìm kiếm sản phẩm yêu thích</DialogTitle>
                <DialogContent>
                    {/* <DialogContentText>
                        Tìm kiếm sản phẩm yêu thích
                    </DialogContentText> */}
                    <br></br>
                    {/* <Box
                        component="form"
                        noValidate
                        autoComplete="off"
                    >

                        <TextField
                            fullWidth
                            id="outlined-uncontrolled"
                            label="Tìm kiếm ngay"

                        />
                    </Box> */}
                    <SearchProduct></SearchProduct>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}