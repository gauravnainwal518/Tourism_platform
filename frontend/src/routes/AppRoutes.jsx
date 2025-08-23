// src/routes/AppRouter.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import ProtectedRoute from "../components/ProtectedRoute";

// Admin
import AdminLogin from "../admin/AdminLogin";
import HomestayApplication from "../admin/HomestayApplications";
import GuideApplication from "../admin/GuideApplications";
import AdminDashboard from "../admin/AdminDashboard";

// Homestay
import HomestayRegisterForm from "../homestays/HomestayRegister";
import HomestayList from "../homestays/HomestayList";
import HomestayDetails from "../homestays/HomestayDetails";
import HomestayEditForm from "../homestays/HomestayEditForm";
import BookHomestay from "../homestays/BookHomestay";
import OwnerDashboard from "../homestays/OwnerDashboard";
import OwnerBookings from "../homestays/OwnerBookings";
import PublicHomestays from "../homestays/PublicHomestays";

// Guide
import GuideList from "../guide/GuideList";
import GuideDetails from "../guide/GuideDetails";
import GuideEditForm from "../guide/GuideEditForm";
import GuideBookings from "../guide/GuideBookings";
import BookGuide from "../guide/BookGuide";
import GuideDashboard from "../guide/GuideDashboard";

// User
import UserBookings from "../user/UserBookings";
import UserDashboard from "../user/UserDashboard";

// Layouts
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";

// Pages
import Home from "../pages/Home";
import SearchResults from "../pages/SearchResults";
import NotFound from "../pages/NotFound";
import About from "../pages/About";
import Contact from "../pages/Contact";

// Auth Pages
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Public Pages/private pages   */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/guides" element={<GuideList />} />
          <Route path="/guides/:id" element={<GuideDetails />} />
          {/* guide purpose in guide dashboard under  view profile  use under */}
          <Route path="/homestays" element={<HomestayList />} />{" "}
          {/*this page is for homestay owner purpose in owner dashboard   */}
          <Route path="/homestays/:id" element={<HomestayDetails />} />
          {/* Public homestays page */}
          <Route path="/homestays-public" element={<PublicHomestays />} />
        </Route>

        {/* Auth Pages (standalone, no layout) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* User Dashboard */}
        <Route
          path="/dashboard/user"
          element={
            <ProtectedRoute role="user">
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<UserDashboard />} />
          <Route path="book-guide" element={<BookGuide />} />
          <Route path="book-homestay" element={<BookHomestay />} />
          <Route path="bookings" element={<UserBookings />} />
          <Route
            path="register-homestay"
            element={<HomestayRegisterForm />}
          />{" "}
          {/*  moved inside user dashboard */}
        </Route>

        {/* Owner Dashboard */}
        <Route
          path="/dashboard/owner"
          element={
            <ProtectedRoute role="owner">
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<OwnerDashboard />} />
          <Route path="bookings" element={<OwnerBookings />} />
          <Route
            path="register-homestay"
            element={<HomestayRegisterForm />}
          />{" "}
          {/* added for owner */}
        </Route>

        {/* Guide Dashboard */}
        <Route
          path="/dashboard/guide"
          element={
            <ProtectedRoute role="guide">
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<GuideDashboard />} />
          <Route path="bookings" element={<GuideBookings />} />
        </Route>

        {/* Admin Dashboard */}
        <Route
          path="/dashboard/admin"
          element={
            <ProtectedRoute role="admin">
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route
            path="homestay-applications"
            element={<HomestayApplication />}
          />
          <Route path="guide-applications" element={<GuideApplication />} />
        </Route>

        {/* Homestay Edit */}
        <Route
          path="/homestays/:id/edit"
          element={
            <ProtectedRoute role="owner">
              <HomestayEditForm />
            </ProtectedRoute>
          }
        />

        {/* Guide Edit */}
        <Route
          path="/guides/:id/edit"
          element={
            <ProtectedRoute role="guide">
              <GuideEditForm />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
