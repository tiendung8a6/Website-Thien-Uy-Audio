import React from "react";

import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
const FormContact = () => {
    return (
        <>
            <Grid container spacing={2} columns={16}>
                <Grid xs={16} lg={8}>
                    <div className='mx-5 my-5'>
                        <h1> Thông tin của chúng tôi</h1>
                        <div>


                            <Grid container spacing={2} columns={16}  >
                                <Grid xs={1} lg={1} className="">
                                    <HomeOutlinedIcon fontSize="large" />
                                </Grid>
                                <Grid xs={15} lg={15}>
                                    <span style={{ fontSize: '24px', fontWeight: '600' }}>Địa chỉ</span><br />
                                    <span style={{ fontSize: '18px' }}>Cư xá Thanh Đa Lô 1 021 Phường 27 Bình Thạnh </span>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} columns={16}  >
                                <Grid xs={1} lg={1} className="">
                                    <HomeOutlinedIcon fontSize="large" />
                                </Grid>
                                <Grid xs={15} lg={15}>
                                    <span style={{ fontSize: '24px', fontWeight: '600' }}>Địa chỉ</span><br />
                                    <span style={{ fontSize: '18px' }}>Cư xá Thanh Đa Lô 1 021 Phường 27 Bình Thạnh </span>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} columns={16}  >
                                <Grid xs={1} lg={1} className="">
                                    <HomeOutlinedIcon fontSize="large" />
                                </Grid>
                                <Grid xs={15} lg={15}>
                                    <span style={{ fontSize: '24px', fontWeight: '600' }}>Địa chỉ</span><br />
                                    <span style={{ fontSize: '18px' }}>Cư xá Thanh Đa Lô 1 021 Phường 27 Bình Thạnh </span>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} columns={16}  >
                                <Grid xs={1} lg={1} className="">
                                    <HomeOutlinedIcon fontSize="large" />
                                </Grid>
                                <Grid xs={15} lg={15}>
                                    <span style={{ fontSize: '24px', fontWeight: '600' }}>Địa chỉ</span><br />
                                    <span style={{ fontSize: '18px' }}>Cư xá Thanh Đa Lô 1 021 Phường 27 Bình Thạnh </span>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </Grid>
                <Grid xs={16} lg={8} >

                    <form className='mx-auto my-5' style={{ width: '80%' }} >
                        <h1> Liên hệ ngay với chúng tôi</h1>
                        {/* <!-- Name input --> */}
                        <div class="form-outline mb-4">
                            {/* <label class="form-label" for="form4Example1">Name</label>
                            <input type="text" id="form4Example1" class="form-control" /> */}
                            <Input
                                id="input-with-icon-adornment"
                                style={{ width: '100%' }}
                                required
                                startAdornment={
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                }
                            />

                        </div>

                        {/* <!-- Email input --> */}
                        <div class="form-outline mb-4">
                            <Input
                                id="input-with-icon-adornment"
                                required
                                style={{ width: '100%' }}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <AlternateEmailIcon />
                                    </InputAdornment>
                                }
                            />

                        </div>

                        {/* <!-- Message input --> */}
                        <div class="form-outline mb-4">
                            <label class="form-label" for="form4Example3">Message</label>
                            <textarea class="form-control" id="form4Example3" rows="4"></textarea>

                        </div>



                        {/* <!-- Submit button --> */}
                        <button type="submit" class="btn btn-primary btn-block mb-4">Send</button>
                    </form>

                </Grid>

            </Grid>

        </>

    );
}

export default FormContact;