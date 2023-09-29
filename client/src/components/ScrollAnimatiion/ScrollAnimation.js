import React from "react";
import './scrollanimation.css'
const ScrollAnimation = () => {
    function reveal() {
        var reveals = document.querySelectorAll(".reveal");

        for (var i = 0; i < reveals.length; i++) {
            var windowHeight = window.innerHeight;
            var elementTop = reveals[i].getBoundingClientRect().top;
            var elementVisible = 150;

            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add("active");
            } else {
                reveals[i].classList.remove("active");
            }
        }
    }

    window.addEventListener("scroll", reveal);

    return (
        <div>
            <section>
                <div className="container reveal">
                    <h2>Caption</h2>
                    <div className="text-container">
                        <div className="text-box">
                            <h3>Section Text</h3>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
                                eius molestiae perferendis eos provident vitae iste.
                            </p>
                        </div>
                        <div className="text-box">
                            <h3>Section Text</h3>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
                                eius molestiae perferendis eos provident vitae iste.
                            </p>
                        </div>
                        <div className="text-box">
                            <h3>Section Text</h3>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
                                eius molestiae perferendis eos provident vitae iste.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            
            
        </div>

    );
}

export default ScrollAnimation;