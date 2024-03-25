import React from 'react';
import { createRoot } from 'react-dom/client'; // Importing createRoot from react-dom/client
import AdvancedSearch from './advanced-search/AdvancedSearch';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ViewDetails from './advanced-search/ViewDetails';
import Home from './advanced-search/Home';
import './advanced-search/index.css';
import RegistrationForm from './auth/Registration';
import LoginForm from './auth/Login'
// import HomeForm from './advanced-search/Navbar'
import ResetPasswordForm from './auth/ResetPassword';
import DeleteAccountForm from './auth/DeleteAccount';
import ChangePasswordForm from './auth/ChangePassword';
import InfoFormCustomer from './advanced-search/InfoFormCustomer';
import InfoFormLawyer from './advanced-search/InfoFormLawyer';
import Real from './advanced-search/Real';
import Booking from './advanced-search/Booking';
import Review from './advanced-search/Review';
import SeeBooking from './advanced-search/SeeBooking';
import SeeMissions from './advanced-search/SeeMissions';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ViewDetailsCustomer from './advanced-search/ViewDetailsCustomer';
import ViewDetailsLawyer from './advanced-search/ViewDetailsLawyer';
const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="934872804375-k6a63jmiq9k9dq8c36dionekj0a50h06.apps.googleusercontent.com">
    <Router>
                <Routes>
                    <Route path="/registration" element={<RegistrationForm />} />
                    {/* <Route path="/auth" element={<HomeForm />} /> */}
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/reset-password" element={<ResetPasswordForm />} />
                    <Route path="/delete-account" element={<DeleteAccountForm />} />
                    <Route path="/change-password" element={<ChangePasswordForm />} />
                    <Route exact path="/advanced-search" element={<AdvancedSearch />} />
                    <Route exact path="/my-account" element={<Home />} />
                    <Route exact path="/" element={<Real />} />
                    <Route exact path="/make-booking/:id" element={<Booking />} />
                    <Route exact path="/make-review/:id" element={<Review />} />       
                    <Route exact path="/insert-info-lawyer" element={<InfoFormLawyer />} />
                    <Route exact path="/insert-info-customer" element={<InfoFormCustomer />} />                   
                    <Route exact path="/see-bookings" element={<SeeBooking />} />
                    <Route exact path="/see-missions" element={<SeeMissions />} />
                    <Route path="/advanced-search/view-details/:id" element={<ViewDetails />} />
                    <Route path="/customer-details/:id" element={<ViewDetailsCustomer/>} />
                    <Route path="/lawyer-details/:id" element={<ViewDetailsLawyer/>} />
                    
                </Routes>
    </Router>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
