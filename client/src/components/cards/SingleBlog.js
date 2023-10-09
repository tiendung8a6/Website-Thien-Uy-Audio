import React, { useState, useEffect } from "react";

import "react-responsive-carousel/lib/styles/carousel.min.css";

import _ from "lodash";

const SingleBlog = (blog) => {
    const { title, images, content } = blog;
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col">

                    <div>
                        
                        <h2>{title}</h2>

                        <p>{content}</p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SingleBlog;
