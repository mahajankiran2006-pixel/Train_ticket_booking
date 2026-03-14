import {React,useEffect } from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link ,Navigate} from 'react-router-dom';
import Navbar2 from './components/Navbar2';
import Foot from './components/Footer';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Home from './components/Home';
import reportWebVitals from './reportWebVitals';
import BookingPage from './components/Booking';
import Aboutus from './components/Aboutus';
import IxigoQuickGuide from './components/Helpus';
import ContactUs from './components/ContactUs';
import Privacy from './components/Privacy';
import Terms from './components/Terms';
import Loginixi from './components/Login';
import Signup from './components/SignUp';
import OfferPage from './components/Offer';
import AdminLogin from './components/Admin';
import AdminDashboard from './components/AdminPanel';
import MyProfile from './components/MyProfile';
import ResultsPage from './components/ResultPage';
import HelpSupport from './components/HelpSupport';
import MyBookings from './components/MyBooking';
import PaymentMethod from './components/Payment';
import TicketBooking from './components/TicketBook';
import Animate from './components/AnimationHome';





import axios from "axios";
import UserTickets from './components/userticket';
import Userprofile from './components/userprofile';
import UserContact from './components/usercontact';









function AppLayout({ isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin }) {

const [users, setUsers] = useState([]); // ✅ fix
  const [form, setForm] = useState({ name: "", email: "" }); // ✅ fix

  useEffect(() => {
  axios.get("http://localhost:5000/station")
    .then(res => console.log("Stations:", res.data))
    .catch(err => console.log("Failed to fetch stations:", err));
}, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000", form)
      .then(res => setUsers([...users, res.data]))
      .catch(err => console.log(err));
  };

  const location = useLocation();

  if (location.pathname === "/Admin" && !isAdmin) {
    return <AdminLogin onAdminLogin={() => setIsAdmin(true)} />;
  }
  return (
    <>
      {(isLoggedIn || isAdmin) && (
        <Navbar2
  isAdmin={isAdmin}
  isLoggedIn={isLoggedIn}
  onLogout={() => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    localStorage.removeItem("isLoggedIn");
  }}
/>

      )}

      <Routes>
        {isAdmin ? (
          <>
            {/* logout handle here.... */}
            <Route
              path="/Admin/*"
              element={<AdminDashboard onAdminLogout={() => setIsAdmin(false)} />}
            />
            <Route path="/AdminPanel" element={<Navigate to="/admin" />} />
            {/* <Route path='/userticket' element={<UserTickets />} /> */}
            <Route path="/" element={<Navigate to="/Admin" />} />
          </>
        ) : isLoggedIn ? (
          <>
            <Route path="/home" element={<Home />} />
            <Route path='/AnimationHome' element={<Animate/>}/>
             <Route path="/MyProfile" element={<MyProfile/>} />  
            <Route path="/Booking" element={<BookingPage />} />
            <Route path="/ResultPage" element={<ResultsPage />} />
            <Route path="/HelpSupport" element={<HelpSupport />}/>
            <Route path="/TicketBook" element={<TicketBooking/>}/>
            
            <Route path="/Payment" element={<PaymentMethod/>}/>
            <Route path="/MyBooking" element={<MyBookings />}/>
            
            <Route path="/offer" element={<OfferPage />} />
            <Route path="/aboutus" element={<Aboutus />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/helpus" element={<IxigoQuickGuide />} />
            <Route path="/Privacy" element={<Privacy />} />
            <Route path="/Terms" element={<Terms />} />
            <Route path="/" element={<Navigate to="/home" />} />
          </>
        ) : (
          <>
            <Route path="/Admin" element={<AdminLogin onAdminLogin={() => setIsAdmin(true)} />} /> 
            <Route path="/" element={<Loginixi onLogin={() => setIsLoggedIn(true)} />} />
            <Route path="/SignUp" element={<Signup />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>

      {(isLoggedIn || isAdmin) && <Foot />}
    </>
  );
}

export default function RootApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <Router>
      
      <AppLayout
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
      />
    </Router>
  );
}


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RootApp />);

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//      <Router>

//       <Navbar2 />

//       <Routes>
//         <Route path="/Adminixi" element={<AdminLog />} />
//         <Route path="/" element={<Home />} />
//         <Route path="/booking" element={<BookingPage />} />
//         <Route path="/Offer" element={<OfferPage/>}/>
//          <Route path="/Aboutus" element={<Aboutus />} />
//            <Route path="/ContactUs" element={<ContactUs />} />
          
//            <Route path="/Login" element={<Loginixi />}  />

//             <Route path="/Helpus" element={<IxigoQuickGuide />}/>
//             <Route path="/Privacy" element={<Privacy />}/>
//             <Route path="/Terms" element={<Terms />}/>
//              <Route path="/SignUp" element={<Signup />}/>
             
//       </Routes>


//       <Foot />
//     </Router>
//   </React.StrictMode>

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
