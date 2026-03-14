import React from "react";
import Privacy from "./Privacy";
import Terms from "./Terms";
import { Link } from "react-router-dom";   
export default function Foot() {
    return (
        <>
            <footer  className="text-white py-4">
                <div className="container">
                    <div className="row text-center text-md-start align-items-start">


                        <div className="col-md-4 mb-3">
                            <h5 className="text-uppercase fw-bold mb-3">Quick Links</h5>
                            <ul className="list-unstyled">
                                <li><Link to="/" className="text-white text-decoration-none d-block py-1">Home</Link></li>
                                <li><Link to="#" className="text-white text-decoration-none d-block py-1">Train Schedule</Link></li>
                                <li><Link to="/booking" className="text-white text-decoration-none d-block py-1">Booking</Link></li>
                                <li><Link to="/ContactUs" className="text-white text-decoration-none d-block py-1">Contact Us</Link></li>
                                <li><Link to="/Privacy" className="text-white text-decoration-none d-block py-1">Privacy & Policy</Link></li>
                                <li><Link to="/Terms" className="text-white text-decoration-none d-block py-1">*Terms & Conditions</Link></li>
                            </ul>
                        </div>


                        <div className="col-md-4 mb-3">
                            <h5 className="text-uppercase fw-bold mb-3">Contact Us</h5>
                            <p className="mb-2"><i className="fas fa-envelope me-2 text-warning"></i> support@ixigo.com</p>
                            <p className="mb-2"><i className="fas fa-phone me-2 text-warning"></i> +91 1234567890</p>
                        </div>

                        <div className="col-md-4 mb-3">
                            <h5 className="text-uppercase fw-bold mb-3">Follow Us</h5>
                            <div className="d-flex justify-content-center justify-content-md-start gap-2">
                                <a href="#" className="btn btn-outline-light rounded-circle"><i className="fab fa-facebook-f"></i></a>
                                <a href="#" className="btn btn-outline-light rounded-circle"><i className="fab fa-twitter"></i></a>
                                <a href="#" className="btn btn-outline-light rounded-circle"><i className="fab fa-instagram"></i></a>
                                <a href="#" className="btn btn-outline-light rounded-circle"><i className="fab fa-linkedin-in"></i></a>
                            </div>
                        </div>

                    </div>


                    <div className="text-center pt-3 mt-3 border-top border-light">
                        <small>&copy; 2024 Ixigo Railway Booking System. All rights reserved.</small>
                    </div>
                </div>
            </footer>



            {/* <footer>
                <div classNameName="footer-container">
                    <div classNameName="footer-links">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><a href="#">Home</a></li>
                            <li><a href="#">Train Schedule</a></li>
                            <li><a href="#">Booking</a></li>
                            <li><a href="#">Contact Us</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                        </ul>
                    </div>
                    <div classNameName="footer-contact">
                        <h4>Contact Us</h4>
                        <p>Email: support@ixigo.com</p>
                        <p>Phone: +91 1234567890</p>
                    </div>
                    <div classNameName="footer-social">
                        <h4>Follow Us</h4>
                        <ul>
                            <li><a href="#">Facebook</a></li>
                            <li><a href="#">Twitter</a></li>
                            <li><a href="#">Instagram</a></li>
                            <li><a href="#">LinkedIn</a></li>
                        </ul>
                    </div>
                </div>
                <div classNameName="footer-bottom">
                    <p>&copy; 2024 Ixigo Railway Booking System. All rights reserved.</p>
                </div>
            </footer> */}

        </>
    );
}