import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function Hel() {
const [openIndexes, setOpenIndexes] = useState([]);

  const toggleFAQ = (index) => {
    setOpenIndexes((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index) // close if already open
        : [...prev, index] // open without closing others
    );
  };

  const faqs = [
    {
      question: "What is ixigo?",
      answer: (
        <p>
          ixigo (Le Travenues Technology Ltd.) was started by Rajnish Kumar and
          Aloke Bajpai in June 2007. ixigo is an intelligent, AI-based travel
          app, with a user base of over 170 million travellers. ixigo uses
          Artificial Intelligence for deal discovery, personalized
          recommendations, dynamic marketing, airfare predictions, train delay
          information, PNR confirmation status, infrastructure cost
          optimization, business intelligence and for providing fully-automated
          customer service over chat and voice.
        </p>
      ),
    },
    {
      question:
        "What are your terms of use and privacy policy? Where can I read more about it?",
      answer: (
        <p>
          We take the privacy of our users very seriously! You can view our{" "}
          <a href="#">Privacy Policy</a> and <a href="#">Terms Of Use</a>.
        </p>
      ),
    },
    {
      question: "How can I know about ixigo mobile apps?",
      answer: (
        <p>
          Know more about the ixigo mobile apps <a href="#">here</a>.
        </p>
      ),
    },
    {
      question: "Why is ixigo different from other travel booking platforms?",
      answer: (
        <>
          <p>
            ixigo is an intelligent, AI-based travel platform that helps you
            organise, book and track your trips. With unique features such as:
          </p>
          <ul>
            <li>Online/Offline Train Running Status</li>
            <li>PNR Prediction</li>
            <li>Refund Calculator</li>
            <li>TDR tracking</li>
            <li>Station Alarm</li>
          </ul>
          <p>
            The ixigo Trains app offers a seamless booking experience in 8 Indian
            languages. The ixigo Flights app also offers unique features like fare
            prediction and auto web check-in.
          </p>
        </>
      ),
    },
    {
      question: "How do I contact ixigo customer care?",
      answer: (
        <>
          <p>
            For any feedback or queries, you can visit the{" "}
            <a href="#">ixigo customer service section</a>.
          </p>
          <p>You can also reach out via:</p>
          <ul>
            <li>Facebook</li>
            <li>Twitter</li>
            <li>Instagram</li>
          </ul>
        </>
      ),
    },
    {
      question: "How can I track refunds on ixigo?",
      answer: (
        <ol>
          <li>Log in to your ixigo account.</li>
          <li>Click on the customer service tab.</li>
          <li>Select your trip from the 'MyTrips' section.</li>
          <li>Click on the booking ID and check the refund status.</li>
        </ol>
      ),
    },
    {
      question: "How do I cancel my ticket on ixigo?",
      answer: (
        <ol>
          <li>Log in to ixigo.</li>
          <li>Visit the 'My Trips' section on the app.</li>
          <li>Select the desired booking and click 'cancel ticket'.</li>
          <li>
            For partial cancellation, select the desired passenger(s) and click
            'cancel'.
          </li>
        </ol>
      ),
    },
    {
      question: "How do I get a refund on a ticket booking through ixigo?",
      answer: (
        <p>
          For confirmed bookings, cancel from the 'My Trips' section. For failed
          bookings, the amount will be reversed to your source account within 7
          days.
        </p>
      ),
    },
    {
      question: "What is your Customer Grievance Redressal policy?",
      answer: (
        <p>
          You can view our{" "}
          <a href="#">Customer Grievance Redressal policy</a> here.
        </p>
      ),
    },
   
  ];
  
  return (
<>
<div className="ixigoforhelp">
  
    <h2 style={{ color:" #2b74ff"}}>ixigo For Your Help</h2>
    <br />
    <p>Here's a compilation of all the travel queries you may have.
         We're pretty sure the answer to your question will be here. 
         </p>  
         <p>Just in case you don't
    see it, please use contact us option mentioned below and we will get back to you for resolution.</p>
</div>

<div className="faq-container">
      {faqs.map((item, index) => (
        <div className="faq-item" key={index}>
          <div className="faq-question" onClick={() => toggleFAQ(index)}>
            <span>{item.question}</span>
            {openIndexes.includes(index) ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          {openIndexes.includes(index) && (
            <div className="faq-answer">{item.answer}</div>
          )}
        </div>
      ))}
    </div>
      <div className="noteofixigo">
        Please note: <br />
        ixigo representatives will never ask for any personal
        information like credit/debit card number, CVV, OTP, card expiry date,
        userIDs, passwords, etc. Also, you will never be asked to install any
        third-party applications, such as AnyDesk or TeamViewer, that grant
        access to your mobile or computer screen. Beware of anyone who is
        claiming to be associated with ixigo. Acting on any such requests may
        make you a victim of fraud, potentially leading to the loss of valuable
        information or money.
      </div> 
</>
);
}