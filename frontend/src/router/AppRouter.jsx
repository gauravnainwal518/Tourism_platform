import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Home from "../pages/Home";
import GuideList from "../pages/GuideList";
import HomestayList from "../pages/HomestayList";
import ExperienceList from "../pages/ExperienceList";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Logout from "../pages/Logout";
import AddGuide from "../pages/AddGuide";
import AddHomestay from "../pages/AddHomestay";
import Dashboard from "../pages/Dashboard";
import BookingWindow from "../pages/Bookings";

const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/guides" element={<GuideList />} />
        <Route path="/homestays" element={<HomestayList />} />
        <Route path="/experiences" element={<ExperienceList />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/bookings" element={<BookingWindow />} />

        <Route path="/addguide" element={<AddGuide />} />
        <Route path="/addhomestay" element={<AddHomestay />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default AppRouter;
