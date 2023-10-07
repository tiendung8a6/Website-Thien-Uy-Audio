
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Link } from "react-router-dom";
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/Email';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import Footer from "../footer/Footer";
const FormContact = () => {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_57j5qhb',
            'template_9rbbvgd',
            form.current, 'UHcC_8bQR3KlPcQwp')
            .then((result) => {
                console.log(result.text);
                alert('success')
            })
            .catch((error) => {
                console.log(error.text);

                alert('Không thể gửi email. Vui lòng thử lại sau.');
            });
    };
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
                                    <span style={{ fontSize: '18px' }}>Cư xá Thanh Đa Lô 1 Phường 27 Bình Thạnh </span>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} columns={16}  >
                                <Grid xs={1} lg={1} className="">
                                    <PhoneAndroidIcon fontSize="large" />
                                </Grid>
                                <Grid xs={15} lg={15}>
                                    <span style={{ fontSize: '24px', fontWeight: '600' }}>Sđt</span><br />
                                    <a style={{ fontSize: '18px' }} tel="079 2826 567">079 2826 567 </a>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} columns={16}  >
                                <Grid xs={1} lg={1} className="">
                                    <EmailIcon fontSize="large" />
                                </Grid>
                                <Grid xs={15} lg={15}>
                                    <span style={{ fontSize: '24px', fontWeight: '600' }}>Email</span><br />
                                    <a style={{ fontSize: '18px' }} href="mailto:thienuyaudio@gmail.com">thienuyaudio@gmail.com</a>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} columns={16}  >
                                <Grid xs={1} lg={1} className="">
                                    <FacebookIcon fontSize="large" />
                                </Grid>
                                <Grid xs={15} lg={15}>
                                    <span style={{ fontSize: '24px', fontWeight: '600' }}>Fanpage</span><br />
                                    <a href="https://www.facebook.com/thietkedankaraoke" style={{ fontSize: '18px' }} rel="noopener noreferrer" target="_blank">https://www.facebook.com/thietkedankaraoke</a>

                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </Grid>
                <Grid xs={16} lg={8} >

                    <form className='mx-auto my-5' style={{ width: '80%' }} ref={form} onSubmit={sendEmail}>
                        <h1> Liên hệ ngay với chúng tôi</h1>
                        <div class="form-outline mb-4">
                            <Input
                                id="input-with-icon-adornment"
                                style={{ width: '100%' }}
                                type="text" name="user_name"
                                required
                                startAdornment={
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                }
                            />
                        </div>
                        <div class="form-outline mb-4">
                            <Input
                                id="input-with-icon-adornment"
                                required
                                style={{ width: '100%' }}
                                type="email" name="user_email"
                                startAdornment={
                                    <InputAdornment position="start">
                                        <AlternateEmailIcon />
                                    </InputAdornment>
                                }
                            />

                        </div>


                        <div class="form-outline mb-4">
                            <label class="form-label" for="form4Example3">Message</label>
                            <textarea name="message" class="form-control" id="form4Example3" rows="4"></textarea>

                        </div>


                        <button type="submit" class="btn btn-primary btn-block mb-4">Gửi</button>
                    </form>

                    {/* <form ref={form} onSubmit={sendEmail}>
                        <label>Name</label>
                        <input type="text" name="user_name" />
                        <label>Email</label>
                        <input type="email" name="user_email" />
                        <label>Message</label>
                        <textarea name="message" />
                        <input type="submit" value="Send" />
                    </form> */}

                </Grid>

            </Grid>
            <Footer></Footer>
        </>

    );
}

export default FormContact;