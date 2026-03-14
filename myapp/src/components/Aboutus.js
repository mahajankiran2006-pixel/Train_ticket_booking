import React from 'react'
import { Link } from 'react-router-dom';
import Toptr from './Toptr';
export default function Aboutus() {
    return (
        <>

            <div className="about-container">

                <section>
                    <h2 className='wel'>Welcome</h2>
                    <p>Welcome to Ixigo Train Booking, your trusted platform for seamless train travel. Our mission is to make train booking easy, efficient, and accessible for everyone.</p>
                </section>

                <section>
                    <h2>Who We Are ?</h2>
                    <p>Launched in 2007, ixigo is a technology company focused on empowering Indian travellers to plan, book and manage their trips across rail and hotels. We assist travellers in making smarter travel decisions by leveraging artificial intelligence, machine learning, and data science-led innovations on our OTA platforms, comprising our websites and mobile applications. Our vision is to become the most customer-centric travel company, by offering the best customer experience to our users. Our focus on travel utility and customer experience for travellers in the 'next billion user' segment is driven by technology, cost-efficiency and our culture of innovation has made us India's leading travel ecosystem for the 'next billion users'.</p>
                    <p>Our OTA platforms allow travellers to book train tickets, hotels and cabs, while providing travel utility tools and services developed using in-house proprietary algorithms and crowd-sourced information, including train PNR status and confirmation predictions, train seat availability alerts, train running status updates and delay predictions, pricing and availability alerts, deal discovery, destination content, personalized recommendations, instant fare alerts, and automated customer support services. Read our travel stories where we cover everything from the latest travel news, Indian Railways reservation updates and more. Let us help you plan your next vacation with our trip planner.</p>
                </section>

                <section>
                    <h2>What We Do ?</h2>
                    <p>We provide a robust online system for booking train tickets, enabling users to:</p>
                    <ul>
                        <li><strong>Search and Compare:</strong> Easily find and compare train routes, schedules, and prices from various operators.</li>
                        <li><strong>Secure Bookings:</strong> Enjoy safe and secure transactions with our encrypted payment system.</li>
                        <li><strong>Real-Time Updates:</strong> Stay informed with real-time updates on train schedules, delays, and cancellations.</li>
                        <li><strong>Customer Support:</strong> Access dedicated customer support to assist you at any stage of your journey.</li>
                    </ul>
                </section>
                <section>
                    <h2>Train Booking on ixigo</h2>
                    <p>ixigo's train app and website simplify train booking. Travellers can finalise their bookings in just a matter of a few clicks. It's both simple and fast. Get free cancellation on your train tickets. Also, we have multiple train booking offers to help you save money.</p>
                </section>
                <section>
                    <ul>
                        <h2 className='here'>Here's how we can help you:</h2>
                        <li><strong>Trains –</strong>Search and book train tickets. Check PNR status & train running status.</li>

                        <li><strong>Hotels –</strong>Find thousands of cheap hotels on ixigo. We have something for every budget.</li>

                        <li><strong>Food on Train –</strong>Get fresh and delicious meals delivered right to your seat with our Order Food on Train feature.</li>
                    </ul>
                </section>
                <section>
                    <h2>Our Vision</h2>
                    <p>We envision a world where train travel is the preferred choice for commuters and adventurers alike. Our goal is to promote sustainable travel by making it easy for people to choose trains over cars and planes.</p>
                </section>
                <section>
                    <h2>Domestic Trains on ixigo</h2>
                    <p>We offer cancellation protection on domestic train bookings. Get the cheapest domestic train fare with the help of fare drop alerts. Our technology helps travellers book cheap trains, hotels, and cabs on arrival or departure.</p>
                </section>
                <section>
                    <h2>Train Status Tracking on ixigo</h2>
                    <p> Our Train Status Tracker Pro feature provides real-time updates, keeping you informed about your train, boarding platform, and other relevant information. Receive instant alerts on any delays to ensure your travel plans stay on track.</p>
                </section>
                <section>
                    <h2>Indian Railway Reservation on ixigo</h2>
                    <p> With ixigo, you can easily do train ticket booking as compared to the normal Indian railway reservation system. Search for your preferred train, check your PNR status, check train running status, explore Tatkal ticket booking, and finalise your train trips. Enjoy ₹0 Payment Gateway fees on booking train tickets via UPI. ixigo offers multiple train booking offers.</p>
                </section>
                <section>
                    <h2>Why Choose Us?</h2>
                    <ul>
                        <li><strong>User-Friendly Interface:</strong> Navigate our platform effortlessly, whether you’re booking a ticket from your desktop or mobile device.</li>
                        <li><strong>Wide Selection:</strong> Choose from a vast array of destinations, routes, and train operators.</li>
                        <li><strong>Competitive Pricing:</strong> Benefit from competitive pricing and exclusive deals.</li>
                        <li><strong>Customer-Centric Approach:</strong> Your satisfaction is our priority. We strive to provide the best service possible.</li>
                    </ul>
                </section>

                <section>
                    <h2>Get in Touch</h2>
                    <p>Have questions or feedback? We’d love to hear from you! Contact us at +91 1234567890 or follow us and stay updated with our latest news and offers.</p>
                </section>
            </div>
            <div>
                <Toptr />
            </div>
            
        </>
    );
}